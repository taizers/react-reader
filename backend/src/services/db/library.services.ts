// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book, Library_book, User } = require('../../db/models/index');
import { Op } from "sequelize";

export const  getPaginatedLibraryBook = async (page: number, limit: number, userId: number, query: string, state: string | null = null) => {
  let where = {} as { title?: object, '$LibraryBooks->library_book.state$'?: string | null | object};
  if (state === 'not' || state === 'read' || state === 'later' || state === 'reading') {
    where = {
      '$LibraryBooks->library_book.state$': state
    }
  } else {
    where = {
      '$LibraryBooks->library_book.state$': {
        [Op.not]: null
      }
    }
  }

  if (query) {
    where.title = {
      [Op.iLike]: `%${query}%`,
    };
  }

  const user = await User.findOne({
    where: { id: userId },
    attributes: {exclude: ['password', 'created_at', 'email', 'updated_at', 'deleted_at']},
    include: [
      {
        model: Book,
        as: 'LibraryBooks',
        where,
        order: [['$LibraryBooks->library_book.updated_at$', 'DESC']],
      },
    ],
    
  });

  return user;
}

export const createLibraryBook = async (payload: object) => {
  try {
    return await Library_book.create(payload);  
  } catch (error) {
    throw new error('Серия не создана');
  }
};

export const  getLibraryBook = async (where: object) => {
  return await Library_book.findOne({ 
    where,
   });
}

export const  updateLibraryBook = async (where: object, payload: object) => {
  return await Library_book.update(
    payload,
    { 
      where,
      // returning: true,
      // plain: true,
    }
  );
}

export const deleteLibraryBook = async (id: string) => {
  await Library_book.destroy({ where: { id } });
}
