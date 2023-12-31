// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book } = require('../../db/models/index');

export const  getAllBooks = async () => {
  const books = await Book.findAll();

  return books;
}

export const  getPaginatedBooks = async (page: number, limit: number) => {

  const { count, rows } = await Book.findAndCountAll({
    offset: page * limit,
    limit,
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
    throw new error('Книга не создана');
  }
};

export const  getBook = async (where: object) => {
  return await Book.findOne({ where });
}

export const  updateBook = async (where: object, payload: object) => {
  return await Book.update(
    payload,
    { 
      where,
      returning: true,
      plain: true,
    }
  );
}

export const deleteBook = async (id: string) => {
  await Book.destroy({ where: { id } });
}
