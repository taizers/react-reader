import fs from 'fs';
import { EntityNotFoundError } from "../../helpers/error";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book_storage } = require('../../db/models/index');

export const createBookStorage = async (payload: object) => {
  try {
    return await Book_storage.create(payload);  
  } catch (error) {
    throw new Error('Книга не создана');
  }
};


export const deleteBookStorage = async (where: object) => {
  const bookStorages = await Book_storage.findAll({where});

  if (!bookStorages.length) {
    return;
  }

  await Promise.all(
    bookStorages.map(async (item: { id: string; link: string }) => {
      await fs.unlink(item.link, ()=>{''});

      const result = await Book_storage.destroy({ where: { id: item.id } });

      if (result === 0) {
        throw new EntityNotFoundError(item.id, 'Book Storage Model');
      }
    })
  );
}
