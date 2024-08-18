import React, { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

import BookItem from '../components/BookItem';
import { BookType } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { remoteBooksApiSlice } from '../store/reducers/RemoteBooksApiSlice';
import { useDebounce, useShowErrorToast } from '../hooks';
import BooksSkeleton from '../skeletons/BooksSkeleton';

const Books: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const debouncedValue = useDebounce(query);

  // const [queryType, setQueryType] = useState('');
  const {
    data: books,
    error,
    isLoading,
  } = remoteBooksApiSlice.useGetRemoteBooksQuery({
    page,
    limit,
    query: debouncedValue,
  });

  useShowErrorToast(error);

  const booksCount = books?.items?.length;

  useEffect(() => {
    if (query) {
      setPage(defaultStartPage);
    }
  }, [query]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(query);
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
        sx={{ mt: 1, display: 'flex', '@media(max-width: 780px)' : { flexDirection: 'column', alignItems: 'center'} }}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%', '@media(max-width: 780px)' : { m: '10px 0' } }}
        >
          Найти
        </Button>
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
            {books.items.map((book: BookType, index: number) => (
              <BookItem book={book} key={`book ${index}`} />
            ))}
          </List>
        )}
        {!booksCount && !isLoading && (
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
            count={books.totalPages}
            color="primary"
            defaultPage={1}
            boundaryCount={2}
            page={page + 1}
            onChange={onPaginationChange}
          />
        )}
        {!!isLoading && <BooksSkeleton />}
      </Box>
    </Box>
  );
};

export default Books;
