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

import BookItem from '../components/BookItem/BookItem';
import { BooksResponceType, BookType } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { remoteBooksApiSlice } from '../store/reducers/RemoteBooksApiSlice';
import { useDebounce, useShowErrorToast } from '../hooks';

const LocalBooks: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const debouncedValue = useDebounce(query);

  // const [queryType, setQueryType] = useState('');
  const {
    data: books,
    error,
    isLoading,
  } = remoteBooksApiSlice.useGetBooksQuery({
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

  // const onSelectChange = (event: SelectChangeEvent) => {
  //     setQueryType(event.target.value);
  // };

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
        {/* <FormControl sx={{minWidth: '20%', ml: 1}} margin="normal">
                    <InputLabel id="select-type-query-label">Тип</InputLabel>
                    <Select
                    required
                    labelId="select-type-query-label"
                    id="demo-simple-select-autowidth"
                    value={queryType}
                    onChange={onSelectChange}
                    autoWidth
                    label="Тип"
                    >
                        <MenuItem value={'books'}>Книги</MenuItem>
                        <MenuItem value={'authors'}>Авторы</MenuItem>
                        <MenuItem value={'series'}>Серии</MenuItem>
                        <MenuItem value={'genres'}>Жанры</MenuItem>
                    </Select>
                </FormControl> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%' }}
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
            count={books.totalPages}
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
