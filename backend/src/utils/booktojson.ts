import * as fs from 'fs';
import EPub from 'epub';
import * as xml2js from 'xml2js';
import { ApplicationError } from '../helpers/error';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const translatte = require('translatte');

interface EbookContent {
    title: string;
    content: string;
}

interface EbookData {
    title: string;
    author: string;
    annotation?: string | null;
    genre?: Array<string> | null;
    language?: string;
    content?: EbookContent[];
}
interface EbookData {
    title: string;
    author: string;
    annotation?: string | null;
    genre?: Array<string> | null;
    language?: string;
    content?: {
        title: string;
        content: string;
    }[];
}

async function parseEbook(filePath: string): Promise<EbookData> {
    const fileExtension = filePath.split('.').pop()?.toLowerCase();

    if (fileExtension === 'epub') {
        return await parseEpub(filePath);
    } else if (fileExtension === 'fb2') {
        return await parseFb2(filePath);
    } else {
        throw new Error('Unsupported file format');
    }
}

async function parseEpub(filePath: string): Promise<EbookData> {
    return new Promise((resolve, reject) => {
        const epub = new EPub(filePath, '/imagewebroot/', '/articlewebroot/');
        
        epub.on('end', async () => {
            try {
                const chaptersInfo = epub.flow.map(chapter => ({ id: chapter.id, title: chapter.title }));

                const contentPromises = chaptersInfo.map(chapterInfo => 
                    new Promise<EbookContent>((resolve, reject) => {
                        epub.getChapter(chapterInfo.id, (error, text) => {
                            if (error) {
                                reject(error);
                            }

                            resolve({
                                title: chapterInfo.title,
                                content: text.replace(/<\/?[^>]+(>|$)/g, "")
                            });
                        });
                    })
                );

                const content = await Promise.all(contentPromises);

                const jsonData: EbookData = {
                    title: epub.metadata.title,
                    author: epub.metadata.creator,
                    language: epub.metadata.language,
                    content: content
                };

                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });

        epub.on('error', reject);
        epub.parse();
    });
}

async function parseFb2(filePath: string): Promise<EbookData> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            xml2js.parseString(data, (err, result) => {
                if (err) {
                    return reject(err);
                }

                const description = result.FictionBook?.description?.[0]?.['title-info']?.[0];
                const body = result.FictionBook?.body?.[0];

                if (!description || !body) {
                    return reject(new Error('Invalid FB2 format'));
                }

                const jsonData: EbookData = {
                    title: description['book-title']?.[0] || 'Unknown Title',
                    author: description.author?.[0] || '',
                    genre: description.genre || null,
                    language: description.lang[0] || null,
                    annotation: description.annotation?.[0]?.p || '',
                    content: body.section?.map((section: {p: string[], title: {p: string[]}[]}) => ({
                        title: section.title?.[0]?.p?.[0] || '',
                        content: section.p?.map(p => p || '').join('\n') || ''
                    })) || []
                };

                resolve(jsonData);
            });
        });
    });
}

const getBookPathAndEnd = (data: string, separator: string) => {
    const arr = data.split(separator);

    const path = arr.slice(0,-1).join(separator);
    const end = arr[arr.length - 1];

    return {path, end};
}

export const saveBookInJson = async (link?: string | null) => {
    if (!link) {
        throw new Error('Have no link to original book');
    }
    
    const text = await parseEbook(link);

    const {path} = getBookPathAndEnd(link, '/');

    fs.writeFile(`${path}/book.txt`, JSON.stringify(text), 'utf8', (err) => { 
      if (err) {
       throw new Error('Cannot write book text to file');
      }
    });
};

export const getBookText = async (link: string | null, language?: string) => {
    return new Promise((resolve, reject) => {
        if (!link) {
            return reject('Have no link to original book');
        }

        const {path} = getBookPathAndEnd(link, '/');
        const filePath = language ? `${path}/book-${language}.txt` : `${path}/book.txt`;

        if (!fs.existsSync(filePath)) {
            throw new ApplicationError("Text doesn't exists!", 404);
        }

        fs.readFile(filePath, 'utf8', (err, data) => { 
            if (err) {
                return reject('Cannot read book text from file');
            }

            return resolve(JSON.parse(data));
        });
    })
};

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateText(text: string, to: string): Promise<string> {
    try {
        const res = await translatte(text, { to });
        return res.text;
    } catch (err) {
        throw new Error('Translate error');
    }
}

function splitText(text: string, maxLength: number): string[] {
    const parts = [];
    let start = 0;
    while (start < text.length) {
        let end = Math.min(start + maxLength, text.length);
        if (end < text.length) {
            const lastSpace = text.lastIndexOf(' ', end);
            if (lastSpace > start) {
                end = lastSpace;
            }
        }
        parts.push(text.slice(start, end));
        start = end + 1;
    }
    return parts;
}

async function translateEbook(ebook: EbookData, targetLanguage: string): Promise<EbookData> {
    let delayValue = 500;

    const translateField = async (field: string | undefined, isChapterPart?: boolean): Promise<string | undefined> => {
        if (!field) return undefined;

        isChapterPart ? delayValue +=1000 : delayValue+=500;
        
        await delay(delayValue);
        return await translateText(field, targetLanguage);
    };

    const translatedTitle = await translateField(ebook.title);
    const translatedAuthor = await translateField(ebook.author);
    const translatedAnnotation = await translateField(ebook.annotation);

    const translatedGenre = ebook.genre ? await Promise.all(ebook.genre.map(async (genre) => {
        return translateField(genre);
    })) : null;

    const translatedContent = ebook.content ? await Promise.all(ebook.content.map(async (chapter) => {
        const translatedChapterTitle = await translateField(chapter.title);

        const contentParts = splitText(chapter.content, 10000);

        const translatedContentParts = await Promise.all(contentParts.map(async (part) => {
            return translateField(part, true);
        }));

        const translatedChapterContent = translatedContentParts.join(' ');

        return {
            title: translatedChapterTitle,
            content: translatedChapterContent
        };
    })) : undefined;

    return {
        title: translatedTitle!,
        author: translatedAuthor!,
        annotation: translatedAnnotation,
        genre: translatedGenre,
        language: targetLanguage,
        content: translatedContent
    };
}

export const saveBookTranslation = async (link: string | null, language: string) => {
    if (!link) {
        throw new Error('Have no link to original book');
    }

    const {path} = getBookPathAndEnd(link, '/');
    const filePath = `${path}/book-${language}.txt`;

    if (fs.existsSync(filePath)) {
        throw new ApplicationError('Translate already exists', 409);
    }

    const text = await getBookText(link) as EbookData;

    const translatedBook = await translateEbook(text, language);

    fs.writeFile(filePath, JSON.stringify(translatedBook), 'utf8', (err) => { 
        if (err) {
         throw new Error('Cannot write book text to file');
        }
    });
}
