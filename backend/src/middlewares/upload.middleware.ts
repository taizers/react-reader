import multer from 'multer';
import moment from 'moment';
import fs from 'fs';
import { Request } from 'express';

const filesStorage = multer.diskStorage({
  destination(req, file, callback) {
    const id = req.params?.bookId;
    const dir = `storage/books/${id}/`;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    
    callback(null, dir);
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}---${file.originalname}`);
  },
});

const booksStorage = multer.diskStorage({
  destination(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    const getNameWithoutFormat = (name: string) => {
      const arr = name.split('.')
      return arr.slice(0,-1).join('.');
    }
    
    const dir = `storage/books/${date}---${getNameWithoutFormat(file.originalname)}/`;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    
    callback(null, dir);

    // TODO добавить перевод и его сохранение json в файл
  },
  filename(req, file, callback) {
    const getFormat = (name: string) => {
      const arr = name.split('.')
      return arr[arr.length -1];
    }

    callback(null, `originalbook.${getFormat(file.originalname)}`);
  },
});


const coversStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/covers/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}---${file.originalname}`);
  },
});

const avatarsStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/avatars/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}---${file.originalname}`);
  },
});

const newsCoverStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/news-covers/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}---${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: (val1: null, val2: boolean) => void) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const booksFilter = (req: Request, file: Express.Multer.File, callback: (val1: null, val2: boolean) => void) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const filesLimits = {
  fileSize: 1024 * 1024 * 15,
};

export const uploadAvatarMiddleware = multer({
  storage: avatarsStorage,
  fileFilter,
  limits,
});

export const uploadNewsCoverMiddleware = multer({
  storage: newsCoverStorage,
  fileFilter,
  limits,
});

export const uploadFilesMiddleware = multer({
  storage: filesStorage,
  limits: filesLimits,
});

export const uploadCoversMiddleware = multer({
  storage: coversStorage,
  fileFilter,
  limits: limits,
});
export const uploadBooksMiddleware = multer({
  storage: booksStorage,
  limits: filesLimits,
});
