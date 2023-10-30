// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book, Library } = require('../../db/models/index');

export const  getPaginatedLibrary = async (page: number, limit: number, userId: number) => {
  const { count, rows } = await Library.findAndCountAll({
    offset: page * limit,
    limit,
    where: { user_id: userId },    
    include: [
      {
        model: Book,
        as: 'book',
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

export const createLibrary = async (payload: object) => {
  try {
    return await Library.create(payload);  
  } catch (error) {
    throw new error('Серия не создана');
  }
};

export const  getLibraryBook = async (where: object) => {
  return await Library.findOne({ where });
}

export const  updateLibraryBook = async (where: object, payload: object) => {
  return await Library.update(
    payload,
    { 
      where,
      // returning: true,
      // plain: true,
    }
  );
}

export const deleteLibraryBook = async (id: string) => {
  await Library.destroy({ where: { id } });
}
