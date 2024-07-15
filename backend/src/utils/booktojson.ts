import * as fs from 'fs';
import EPub from 'epub';
import * as xml2js from 'xml2js';
// import { translate } from '@vitalets/google-translate-api';
// import { HttpProxyAgent } from 'http-proxy-agent';

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

// export const getTranslatedChapter = async (chapter: {title: string, content: string}) => {
//     const agent = new HttpProxyAgent('http://172.105.13.173');

//     const translatedTitle = chapter.title?.length && await translate(chapter.title, { to: 'ru', fetchOptions: { agent } }) ;
//     const translatedContent = chapter.content?.length && await translate(chapter.content, { to: 'ru', fetchOptions: { agent } }) ;

//     return {title: translatedTitle, content: translatedContent }
// }

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
                    content: body.section?.map((section: any) => ({
                        title: section.title?.[0]?.p?.[0] || '',
                        content: section.p?.map((p: any) => p || '').join('\n') || ''
                    })) || []
                };

                resolve(jsonData);
            });
        });
    });
}

export const getJsonBook = async (link: string | null | undefined): Promise<EbookData> => {
    if (!link) {
        return null;
    }

    return await parseEbook(link);
};
