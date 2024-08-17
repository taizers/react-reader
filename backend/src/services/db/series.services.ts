// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book, Seria, Tag, Genre } = require('../../db/models/index');
import { Op, literal } from "sequelize";
import { sequelize } from '../../db/models';
import { updateBook } from "./books.services";

export const  getSeriaFields = async (where: object, fields: string[]) => {
  const seria = await Seria.findOne({
    where,
    attributes: [...fields],
    row: true,
  });

  return seria;
}

export const  getSeriaWithBookIds = async (where: object) => {
  const seria = await Seria.findOne({
    where,
    attributes: ['id', 'user_id'],
    include: [
      {
        model: Book,
        as: 'seriabooks',
        attributes: ['id'],
      }
    ],
    row: true,
  });

  return seria;
}

export const  getPaginatedSeries = async (page: number, limit: number, query: string, user_id: number) => {
  const where = {} as {title: object};

  const innerWhere = {
    [Op.or]: [{privat: false}, {[Op.and]: [{privat: true}, {user_id}]}]
  };

  if (query) {
    where.title = {
      [Op.iLike]: `%${query}%`,
    };
  }

  const { count, rows } = await Seria.findAndCountAll({
    offset: page * limit,
    limit,
    attributes: {
      include: [[literal("(SELECT COUNT(*) FROM books where books.seria_id=seria.id)"), "booksCount"]]
    },
    where: where,
    include: [
      {
        model: Book,
        as: 'seriabooks',
        required: false,
        where:  innerWhere,
        attributes: [],
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

  if (!rows.length) {
    return {};
  }

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return {
    totalPages,
    page: page + 1,
    series: rows,
  };
};

export const  getSeriesList = async (query: string) => {
  const where = {} as {title: object};

  if (query) {
    where.title = {
      [Op.like]: `%${query}%`,
    };
  }

  const series = await Seria.findAll({
    where,
    attributes: { include: ['id', 'title',] },
    order: [['created_at', 'DESC']],
  });

  return series;
};

export const createSeria = async (payload: object, genres: Array<string>, tags: Array<string>) => {
  try {
    const transaction = await sequelize.transaction();

    const seria =  await Seria.create(payload);  

    if (genres?.length) {
      await seria?.addGenre(genres, { transaction });

    }
    if (tags?.length) {
      await seria?.addTag(tags, { transaction });
    }

    await transaction.commit();

    return seria;
  } catch (error) {
    throw new error('Серия не создана');
  }
};

export const  getSeria = async (where: object, user_id: number) => {
  const innerWhere = {
    [Op.or]: [{privat: false}, {[Op.and]: [{privat: true}, {user_id}]}]
  };

  return await Seria.findOne({ 
    where,
    attributes: {
      include: [[literal("(SELECT COUNT(*) FROM books where books.seria_id=seria.id)"), "booksCount"]]
    },
    include: [
      {
        model: Book,
        as: 'seriabooks',
        required: false,
        where:  innerWhere,
      },
      {
        model: Tag,
        attributes: ['id', 'title',] ,
      },
      {
        model: Genre,
        attributes: ['id', 'title',] ,
      },
    ]
   });
}

export const  updateSeria = async (where: object, payload: object, genres?: Array<string>, tags?: Array<string>) => {
  const updatedSeria = await Seria.update(payload, {where});

  if (!genres?.length && !tags?.length) {
    return updatedSeria;
  }

  const seria = await Book.findOne({
    where,
    row: true,
  });

  if (genres?.length) {
    const seriaGenres = await seria?.getGenres();
    await seria?.removeGenres(seriaGenres);
    await seria?.addGenres(genres);
  }

  if (tags?.length) {
    const seriaTags = await seria?.getTags();
    await seria?.removeTags(seriaTags);
    await seria?.addTags(tags);
  }
  
  return seria;
}

export const deleteSeria = async (id: string, booksIds?: {id: string|number}[]) => {
  try {
  const transaction = await sequelize.transaction();

  await Promise.all(booksIds.map(async(item) => {
    await updateBook({id: item.id}, {seria_id: null});
  }))

  await Seria.destroy({ where: { id } });

  await transaction.commit();
  } catch (error) {
    throw new Error(error);
  }
}
