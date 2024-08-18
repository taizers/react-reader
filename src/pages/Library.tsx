import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { stateValuesType, ILocalBook, } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage, libraryBookStatusesForSearch } from '../constants/constants';
import { useAppSelector, useDebounce, useShowErrorToast } from '../hooks';
import { libraryBooksApiSlice } from '../store/reducers/LibraryBooksApiSlice';
import LibraryBookStatusComponent from '../components/LibraryBookStatusComponent';
import BooksSkeleton from '../skeletons/BooksSkeleton';
import CardsList from '../components/CardsList';
import NoDataText from '../components/NoDataText';
import { useGetQueryResponce } from '../models/requests';
import LocalBookItem from '../components/LocalBookItem';

interface LibraryBooksData {
  LibraryBooks: ILocalBook[];
  totalPages: number;
}

const Library: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [state, setState] = useState<stateValuesType>(null);

  const debouncedValue = useDebounce(query);

  const { user } = useAppSelector((state) => state.auth);

  const { data, error, isLoading: libraryIsLoading } = libraryBooksApiSlice.useGetUserLibraryBooksQuery<useGetQueryResponce<LibraryBooksData>>({
    page,
    limit,
    query: debouncedValue,
    id: user?.id,
    state
  });

  useShowErrorToast(error);

  const booksCount = data?.LibraryBooks?.length;

  const onDeleteBookFromLibrary = () => {
    setState(null);
  };

  const onUpdateBookStatusAtLibrary = (state: stateValuesType) => {
    setState(state);
  };

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
        sx={{ mt: 1, display: 'flex', gap: '20px', '@media(max-width: 780px)' : { flexDirection: 'column', alignItems: 'center', gap: '20px'} }}
      >
        <Box sx={{display: 'flex', flexGrow: 1, '@media(max-width: 780px)' : { width: '100%', flexDirection: 'column', alignItems: 'center' },}}>
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
        <LibraryBookStatusComponent styles={{alignSelf: 'center', ml: 2, width: 'auto'}} onDeleteFunction={onDeleteBookFromLibrary} onUpdateStatusFunction={onUpdateBookStatusAtLibrary} state={state} statuses={libraryBookStatusesForSearch} />
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {booksCount && <CardsList items={data.LibraryBooks} renderItem={(book) => <LocalBookItem book={book} key={`book ${book.id}`} type="library" />} />}
        {!booksCount && !libraryIsLoading && <NoDataText />}
        {!!libraryIsLoading && <BooksSkeleton />}
      </Box>
    </Box>
  );
};

export default Library;
