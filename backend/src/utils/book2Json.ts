import { readFileSync } from 'fs';
import iconv from 'iconv-lite';

const descriptionTag = 'description';
const annotaionTag = 'annotation';
const bodyTag = 'body';
const sectionTag = 'section';
const binaryTag = 'binary';
const titleTag = 'title';
const fullLineTag = '<br/>';
const paragrafTag = 'p';

const getCodeForEncoding = (file: Buffer) => {
    const stringedFile = file.toString('utf8', 0, 100);

    const fileEncoding = stringedFile.slice(stringedFile.indexOf('encoding'), stringedFile.indexOf('?>'));

    const code = fileEncoding.split('"')[1];
    const encodingArray = {
        "windows-1251": "win1251",
    } as any;

    return encodingArray[code];
};

const getTagsList = (string: string, tag: string) =>  {

    const clearString = string.replace(/[\r\n]+/g, "").split(`<${tag}`).join('').split(`</${tag}>`).slice(0,-1);

    const result = clearString.map((item) => {
        const str = item.trim();

        if (str.charAt(0) === '>'){
            return str.slice(1).trim();
        }

        return str;
    });

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
    const result = sections.map((item) => {
        const title = getTagContainsString(item, titleTag);
        const titleParagrafs = getTagsList(title, paragrafTag);
        const paragrafs = getTagsList(item, paragrafTag);

        paragrafs.shift();

        return {titleParagrafs, paragrafs};
    });
    return result;
}

const getBinaryData = (book: string, tag: string) => {
    const binaries = getTagsList(book, tag);
    const idString = 'id';
    const contenttypeString = 'content-type';
    

    const jsonBinaries = binaries.map((item) => {
        const data = item.split('>');

        const binary = data[1];
        const serviceData = data[0];

        const id = getTagValue(serviceData, idString);
        const contentType = getTagValue(serviceData, contenttypeString);

        return {id, contentType, binary}
    });

    return jsonBinaries;
}

export const getBookText = (link: string | null | undefined) => {
    if (!link) {
        return null;
    }

    const file = readFileSync(link);

    const code = getCodeForEncoding(file);

    const stringedBook = iconv.encode(iconv.decode (file, code), 'utf8').toString();

    // отдельные функции для обработки
    const description = getTagContainsString(stringedBook, descriptionTag);
    const body = getTagContainsString(stringedBook, bodyTag);
    const binaries = getBinaryData(stringedBook, binaryTag);

    // const binary = getTagContainsString(stringedBook, binaryTag);

    const annotation = getTagContainsString(description, annotaionTag);

    // const sections = getTagsList(body, sectionTag);
    const sections = getSections(body, sectionTag);

    const clearAnnotation = getTagsList(annotation, paragrafTag);

    return {sections}
}
