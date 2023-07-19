import { Request, Response, NextFunction } from 'express';
import { customResponse } from '../helpers/responce';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;

export default async (
  erroror: any,
  req: any,
  res: Response,
  next: NextFunction
) => {
  erroror.status = erroror.statusCode || erroror.status || 500;

  let validationMessage;

  try {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    if (req.files?.length) {
      await Promise.all(
        req.files.map(async (item: { path: string }) => {
          await fs.unlink(item.path);
        })
      );
    }
  } catch (erroror: any) {
    erroror.status = erroror.statusCode || erroror.status || 500;
    return customResponse(res, erroror.status, {
      code: erroror.status,
      message: validationMessage || erroror.message,
    });
  }

  if (erroror?.details) {
    Object.values(erroror.details)?.forEach((element: any) => {
      if (element[0]?.message) {
        validationMessage = element[0]?.message;
      }
    });
  }

  console.log(erroror);
  return customResponse(res, erroror.status, {
    code: erroror.status,
    message: validationMessage || erroror.message,
  });
};
