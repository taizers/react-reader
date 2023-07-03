import FlibustaAPI from 'flibusta';

export const  generateTokens = async (query: string, page: number, limit: number) => {
  const flibustaApi = new FlibustaAPI();

  const books = await flibustaApi.getBooksByNameFromOpdsPaginated(query, page, limit);

  return books;
};


  // async getBooksByAuthor(id, page, limit) {
  //   const flibustaApi = new FlibustaAPI();
    
  //   const books = await flibustaApi.getBooksByAuthorOpdsPaginated(id, page, limit);
    
  //   return books;
  // }

