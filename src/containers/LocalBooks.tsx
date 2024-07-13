import React, { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import BookItem from '../components/BookItem/BookItem';
import { BookType, LocalBookType } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import UploadBookModal from './UploadBookModal';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import LocalBookItem from '../components/LocalBookItem/LocalBookItem';

const LocalBooks: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const debouncedValue = useDebounce(query);

  const {
    data,
    error,
    isLoading,
  } = booksApiSlice.useGetBooksQuery({
    page,
    limit,
    query: debouncedValue,
  });
  const [deleteBook, { data: deleteData, error: deleteError, isLoading: deleteIsLoading }] =
  booksApiSlice.useDeleteBookMutation();
  // const {
  //   data: books,
  //   error,
  //   isLoading,
  // } = booksApiSlice.useGetBookQuery(3);



  useShowErrorToast(error);
  useShowErrorToast(deleteError);

  const booksCount = data?.books?.length;

  useEffect(() => {
    if (query) {
      setPage(defaultStartPage);
    }
  }, [query]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query) {
      setPage(defaultStartPage);
    }
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (query) {
      window.scrollTo(0, 0);
    }
    setPage(value - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1, display: 'flex' }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="query"
          label="Название"
          name="query"
          autoComplete="text"
          autoFocus
          onChange={(e: any) => setQuery(e.currentTarget.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%' }}
        >
          Найти
        </Button>
        <UploadBookModal/>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {booksCount && (
          <List
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 2,
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
            {data.books.map((book: LocalBookType, index: number) => (
              <LocalBookItem book={book} key={`book ${index}`} deleteBook={deleteBook}/>
            ))}
          </List>
        )}
        {!booksCount && (
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              fontSize: 22,
            }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {'Нет данных'}
          </Typography>
        )}
        {booksCount && (
          <Pagination
            count={data.totalPages}
            color="primary"
            defaultPage={1}
            boundaryCount={2}
            page={page + 1}
            onChange={onPaginationChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default LocalBooks;
