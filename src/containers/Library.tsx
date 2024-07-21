import React, { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ExternalStatus, LocalBookType } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage, libraryBookStatusesForSearch } from '../constants/constants';
import { useAppSelector, useDebounce, useShowErrorToast } from '../hooks';
import { libraryBooksApiSlice } from '../store/reducers/LibraryBooksApiSlice';
import LibraryBookItem from '../components/LibraryBookItem';
import LibraryBookStatusComponent from '../components/LibraryBookStatusComponent';
import BookSkeleton from '../skeletons/BookSkeleton';
import BooksSkeleton from '../skeletons/BooksSkeleton';

const Library: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [state, setState] = useState<ExternalStatus>(null);

  const debouncedValue = useDebounce(query);

  const { user } = useAppSelector((state) => state.auth);

  const { data, error, isLoading: libraryIsLoading } = libraryBooksApiSlice.useGetUserLibraryBooksQuery({
    page,
    limit,
    query: debouncedValue,
    id: user?.id,
    state
  });

  const [
    updateLibraryBook,
    { data: updateLibraryBookData, error: updateLibraryBookError, isLoading: updateLibraryBookIsLoading },
  ] = libraryBooksApiSlice.useUpdateLibraryBookMutation();

  useShowErrorToast(error);
  useShowErrorToast(updateLibraryBookError);

  const booksCount = data?.LibraryBooks?.length;

  const onDeleteBookFromLibrary = () => {
    setState(null);
  };

  const onUpdateBookStatusAtLibrary = (state: ExternalStatus) => {
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
        <LibraryBookStatusComponent styles={{alignSelf: 'center', ml: 2, width: 'auto'}} onDeleteFunction={onDeleteBookFromLibrary} onUpdateStatusFunction={onUpdateBookStatusAtLibrary} state={state} statuses={libraryBookStatusesForSearch} />
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
            {data.LibraryBooks.map((book: LocalBookType, index: number) => (
              <LibraryBookItem
                updateLibraryBook={updateLibraryBook}
                book={book}
                key={`book ${index}`}
              />
            ))}
          </List>
        )}
        {!booksCount && !libraryIsLoading && (
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
        {!!libraryIsLoading && <BooksSkeleton />}
      </Box>
    </Box>
  );
};

export default Library;
