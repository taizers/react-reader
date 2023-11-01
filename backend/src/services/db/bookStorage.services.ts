import fs from 'fs';
import { EntityNotFoundError, UnCreatedError } from "../../helpers/error";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book_storage } = require('../../db/models/index');

interface ICreationPayload {
  user_id: string;
  book_id: string;
  files: Array<{destination: string; filename: string}>;
}

export const createBookStorage = async (payload: ICreationPayload) => {
    await Promise.all(
      payload.files?.map(async (item)=>{
        await  Book_storage.create({book_id: payload.book_id, user_id: payload.user_id, link: `${item.destination}${item.filename}`});
      })
    )
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
