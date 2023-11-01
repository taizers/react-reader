// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book, Seria, Book_storage } = require('../../db/models/index');
import { Op } from "sequelize";
import fs from 'fs';
import { UnCreatedError } from "../../helpers/error";
import book_storage from "../../db/models/book_storage";

export const  getAllBooks = async () => {
  const books = await Book.findAll();

  return books;
}

export const  getPaginatedBooks = async (page: number, limit: number, query: string) => {
  const where = {} as {title: object};

  if (query) {
    where.title = {
      [Op.like]: `%${query}%`,
    };
  }

  const { count, rows } = await Book.findAndCountAll({
    offset: page * limit,
    limit,
    where,
    include: [
      {
        model: Seria,
        as: 'seria',
        attributes: { include: ['id', 'title',] },
      },
    ],
    order: [['created_at', 'DESC']],
  });

  if (!rows.length) {
    return {};
  }

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return {
    totalPages,
    page: page + 1,
    books: rows,
  };
}

export const createBook = async (payload: object) => {
  try {
    return await Book.create(payload);  
  } catch (error) {
    throw new UnCreatedError('Книга');
  }
};

export const  getBook = async (where: object) => {
  return await Book.findOne({ 
    where,
    include: [
      {
        model: Book_storage,
        as: 'storages',
      },
    ],
  });
}

export const  updateBook = async (where: object, payload: object) => {
  return await Book.update(
    payload,
    { 
      where,
      // returning: true,
      // plain: true,
    }
  );
}

export const deleteBook = async (id: string) => {
  fs.rmSync(`storage/books/${id}`, { recursive: true, force: true });

  await Book.destroy({ where: { id } });
}
