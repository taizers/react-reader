import { UnCreatedError } from "../../helpers/error";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Genre } = require('../../db/models/index');
import { Op } from "sequelize";

export const createGenre = async (payload: {title: string}) => {
  try {
    return await Genre.create(payload);  
  } catch (error) {
    throw new UnCreatedError('Genre');
  }
};

export const deleteGenre = async (id: string) => {
  await Genre.destroy({ where: { id } });
}

export const  getGenresByQuery = async (query: string) => {
  const where = {} as {title: object};

  if (query) {
    where.title = {
      [Op.like]: `%${query}%`,
    };
  }

  const tags = await Genre.findAll({
    where,
    order: [['created_at', 'DESC']],
  });

  return tags;
}
