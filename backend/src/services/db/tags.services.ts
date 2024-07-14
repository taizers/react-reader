import { UnCreatedError } from "../../helpers/error";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Tag } = require('../../db/models/index');
import { Op } from "sequelize";

export const createTag = async (payload: {title: string}) => {
  try {
    return await Tag.create(payload);  
  } catch (error) {
    throw new UnCreatedError('Tag');
  }
};

export const deleteTag = async (id: string) => {
  await Tag.destroy({ where: { id } });
}

export const  getTagsByQuery = async (query: string) => {
  const where = {} as {title: object};

  if (query) {
    where.title = {
      [Op.like]: `%${query}%`,
    };
  }

  const tags = await Tag.findAll({
    where,
    order: [['created_at', 'DESC']],
  });

  return tags;
}
