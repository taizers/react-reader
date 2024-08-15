import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type BookType = {
  // book: any;
  // getBook: (id: string) => void;
};

const Book: FC<BookType> = ({}) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // getBook(id);
    }
  }, []);

  return <></>;
};

export default Book;
