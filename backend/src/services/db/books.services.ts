// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book, Seria, Tag, Genre, User } = require('../../db/models/index');
import { Op } from "sequelize";
import { sequelize } from '../../db/models';
import fs from 'fs';
import { UnCreatedError } from "../../helpers/error";

export const  getBookFields = async (where: object, fields: string[]) => {
  const book = await Book.findOne({
    where,
    attributes: [...fields],
    row: true,
  });

  return book;
}
export const  getAllBooks = async () => {
  const books = await Book.findAll();

  return books;
}

export const  getPaginatedBooks = async (page: number, limit: number, id: number, query: string) => {
  const where = {
    [Op.or]: [{privat: false}, {[Op.and]: [{privat: true}, {user_id: id}]}]
  } as any;

  if (query) {
    where.title = {
      [Op.iLike]: `%${query}%`,
    };
  }

  const offset = page * limit;

  const { count, rows } = await Book.findAndCountAll({
    offset,
    limit,
    where,
    include: [
      {
        model: Seria,
        as: 'seria',
        attributes: ['id', 'title',] ,
      },
      {
        model: User,
        as: 'UsersBooks',
        required: false,
        where:  { id },
        attributes: ['id', 'name',],
      },
      {
        model: Tag,
        attributes: ['id', 'title',] ,
      },
      {
        model: Genre,
        attributes: ['id', 'title',] ,
      },
    ],
    order: [['created_at', 'DESC']],
  });

  if (!rows?.length) {
    return {};
  }

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return {
    totalPages,
    page: page + 1,
    books: rows,
  };
}

export const createBook = async (payload: object, genres: Array<string>, tags: Array<string>) => {
  try {
    const transaction = await sequelize.transaction();

    const book = await Book.create(payload); 
  
    if (genres?.length) {
      await book?.addGenre(genres, { transaction });

    }
    if (tags?.length) {
      await book?.addTag(tags, { transaction });
    }

    await transaction.commit();

    return book;
  } catch (error) {
    throw new UnCreatedError('Книга');
  }
};

export const  getBook = async (where: object, user_id?: number) => {
  let locWhere = {};

  if (user_id) {
    locWhere = {[Op.or]: [{privat: false}, {[Op.and]: [{privat: true}, {user_id}]}]}
  }

  return await Book.findOne({ 
    where: {...where, ...locWhere},
    include: [
      {
        model: Seria,
        as: 'seria',
        attributes: { include: ['id', 'title',] },
      },
      {
        model: Tag,
        attributes: { include: ['id', 'title',] },
      },
      {
        model: Genre,
        attributes: { include: ['id', 'title',] },
      },
    ],
  });
}

export const  updateBook = async (where: object, payload: object, genres: Array<string>, tags: Array<string>) => {
  const updatedBook = await Book.update(payload, {where});

  if (!genres.length && !tags.length) {
    return updatedBook;
  }

  const book = await Book.findOne({
    where,
    row: true,
  });

  if (genres?.length) {
    const bookGenres = await book?.getGenres();
    await book?.removeGenres(bookGenres);
    await book?.addGenres(genres);
  }

  if (tags?.length) {
    const bookTags = await book?.getTags();
    await book?.removeTags(bookTags);
    await book?.addTags(tags);
  }
  
  return book;
}

export const deleteBook = async (id: string) => {
  fs.rmSync(`storage/books/${id}`, { recursive: true, force: true });

  await Book.destroy({ where: { id } });
}
