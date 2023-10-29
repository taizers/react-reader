// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Book, Seria } = require('../../db/models/index');

export const  getPaginatedSeries = async (page: number, limit: number, query: string) => {
  const { count, rows } = await Seria.findAndCountAll({
    offset: page * limit,
    limit,
    where: { title: query },    
    include: [
      {
        model: Book,
        as: 'books',
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
}

export const createSeria = async (payload: object) => {
  try {
    return await Seria.create(payload);  
  } catch (error) {
    throw new error('Серия не создана');
  }
};

export const  getSeria = async (where: object) => {
  return await Seria.findOne({ where });
}

export const  updateSeria = async (where: object, payload: object) => {
  return await Seria.update(
    payload,
    { 
      where,
      // returning: true,
      // plain: true,
    }
  );
}

export const deleteSeria = async (id: string) => {
  await Seria.destroy({ where: { id } });
}
