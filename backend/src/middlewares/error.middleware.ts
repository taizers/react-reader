import { Request, Response, NextFunction } from 'express';
import { customResponse } from '../helpers/responce';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;

export default async (
  error: any,
  req: any,
  res: Response,
  next: NextFunction
) => {
  error.status = error.statusCode || error.status || 500;

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
  } catch (error: any) {
    error.status = error.statusCode || error.status || 500;
    return customResponse(res, error.status, {
      code: error.status,
      message: validationMessage || error.message,
    });
  }

  if (error?.details) {
    Object.values(error.details)?.forEach((element: any) => {
      if (element[0]?.message) {
        validationMessage = element[0]?.message;
      }
    });
  }

  console.log(error);
  return customResponse(res, error.status, {
    code: error.status,
    message: validationMessage || error.message,
  });
};
