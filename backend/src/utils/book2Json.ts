import { readFileSync } from 'fs';
import iconv from 'iconv-lite';
import fs from 'fs';
import { isArray, isEmpty } from 'lodash';

const descriptionTag = 'description';
const annotaionTag = 'annotation';
const bodyTag = 'body';
const sectionTag = 'section';
const binaryTag = 'binary';
const titleTag = 'title';
const fullLineTag = '<br/>';
const paragrafTag = 'p';
const titleInfoTag = 'title-info';
const documentInfoTag = 'document-info';
const publishInfoTag = 'publish-info';
const bookTitleTag = 'book-title';
const authorTag = 'author';
const languageTag = 'lang';

const getCodeForEncoding = (file: Buffer) => {
    const stringedFile = file.toString('utf8', 0, 100);

    const fileEncoding = stringedFile.slice(stringedFile.indexOf('encoding'), stringedFile.indexOf('?>'));

    const code = fileEncoding.split('"')[1];
    const encodingArray = {
        "windows-1251": "win1251",
    } as any;

    return encodingArray[code];
};

// const getTagsList = (string: string, tag: string) =>  {
//     const clearString = string.replace(/[\r\n]+/g, "");
//     const splitedString = clearString.split(`<${tag}`).join('').split(`</${tag}>`)

//     const result = splitedString.map((item) => {
//         const str = item.trim();

//         if (str.charAt(0) === '>'){
//             return str.slice(1).trim();
//         }

//         return str;
//     });

//     // result.shift();
//     // result.pop();

//     return result;
// };

const getTagsList = (str: string, tag: string) =>  {  
    const arr = ['0', str, '0'];
    const string = arr.join('');

    const splitedString = string.split(`<${tag}`);

    const firstArray = splitedString.map((item) => {
        const str = item.trim();

        if (str.charAt(0) === '>'){
            return str.slice(1).trim();
        }

        return str;
    });

    const result = [] as any;

    firstArray.forEach((item) => {
        const str = item.trim();

        const splitedStr = str.split(`</${tag}>`);

        if (isArray(splitedStr)) {
            splitedStr.forEach(item => {
                const str1 = item.trim();

                if (isEmpty(str1)) {
                    return;
                }

                result.push(str1);
            })
        } else
        result.push(splitedStr);
    });

    result.shift();
    result.pop();

    return result;
};

const getTagContainsString = (string: string ,tag: string) => {
    const tagSymbolsCount = 2;

    const result = string.slice(string.indexOf(`<${tag}>`) + tag.length + tagSymbolsCount, string.indexOf(`</${tag}>`));

    return result;
};

const getTagValue = (string: string, tag: string) => {
    const containsString = '"';
    const equalString = '=';

    const startIndex = string.indexOf(tag + equalString) + tag.length + containsString.length + 1;
    const endIndex = string.indexOf(containsString, startIndex);

    const value = string.slice(startIndex, endIndex);

    return value;
};

const getSections = (body: string, sectionTag: string) => {
    const sections = getTagsList(body, sectionTag);
    const result = sections.map((item: string) => {
        const title = getTagContainsString(item, titleTag);
        const titleParagrafs = getTagsList(title, paragrafTag);

        const paragrafsString = item.replace(`<${titleTag}>` + title + `</${titleTag}>`,'');
        const paragrafs = getTagsList(paragrafsString, paragrafTag);

        return {title: titleParagrafs, paragrafs};
    });
    return result;
}

const getBinaryData = (book: string, tag: string) => {
    const binaries = getTagsList(book, tag);
    const idString = 'id';
    const contenttypeString = 'content-type';
    

    const jsonBinaries = binaries.map((item: string) => {
        const data = item.split('>');

        const binary = data[1];
        const serviceData = data[0];

        const id = getTagValue(serviceData, idString);
        const contentType = getTagValue(serviceData, contenttypeString);

        return {id, contentType, binary}
    });

    return jsonBinaries;
}

const writeFileSync = (path: string, base64File: any) =>  {
    try {
        const buff = Buffer.from(base64File, 'base64');
        fs.writeFileSync(path, buff);
    } catch (error) {
        console.log(error);
    }
}

const getDiscription = (string: string) => {
    const titleInfoString = getTagContainsString(string, titleInfoTag);

    const bookTitle = getTagsList(titleInfoString, bookTitleTag);
    const author = getTagsList(titleInfoString, authorTag);
    
    const annotation = getTagContainsString(titleInfoString, annotaionTag);
    const clearAnnotation = getTagsList(annotation, paragrafTag);

    const language = getTagContainsString(titleInfoString, languageTag);

    const documentInfoString = getTagContainsString(string, documentInfoTag);
    const publisinfoString = getTagContainsString(string, publishInfoTag);



    return {bookInfo: {bookTitle, annotation: clearAnnotation, author, language}}
}

export const getBookText = (link: string | null | undefined) => {
    if (!link) {
        return null;
    }

    const file = readFileSync(link);

    const code = getCodeForEncoding(file);

    const stringedBook = iconv.encode(iconv.decode (file, code), 'utf8').toString();

    const clearString = stringedBook.replace(/[\r\n]+/g, "");
    const clearStringedBook = clearString.replace(/<empty-line\/>/g, "");

    // отдельные функции для обработки
    const description = getTagContainsString(clearStringedBook, descriptionTag);
    const body = getTagContainsString(clearStringedBook, bodyTag);
    // const binaries = getBinaryData(stringedBook, binaryTag);

    // const binary = getTagContainsString(stringedBook, binaryTag);


    // const sections = getSections(body, sectionTag);


    //binaries delete first

    // writeFileSync(`storage/${binaries[1].id}`, binaries[1].binary);

    const result = getSections(body, sectionTag);
    const description1 = getDiscription(description);

    return {result, description1}
}
