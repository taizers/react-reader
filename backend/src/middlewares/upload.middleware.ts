import multer from 'multer';
import moment from 'moment';

const filesStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/files/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const galeriesStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/galeries-items/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const avatarsStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/avatars/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const newsCoverStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/news-covers/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, callback: any) => {
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

export const uploadGaleryMiddleware = multer({
  storage: galeriesStorage,
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
