import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { ILocalBook } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import UploadBookModal from '../containers/UploadBookModal';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import LocalBookItem from '../components/LocalBookItem';
import CreateTagModal from '../containers/CreateTagModal';
import CreateGenreModal from '../containers/CreateGenreModal';
import BooksSkeleton from '../skeletons/BooksSkeleton';
import CardsList from '../components/CardsList';
import NoDataText from '../components/NoDataText';
import { useGetQueryResponce } from '../models/requests';

interface LocalBooksData {
  books: ILocalBook[];
  totalPages: number;
}

const LocalBooks: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [isCreateTagModalOpen, setCreateTagModalOpen] =
    useState<boolean>(false);
  const [isCreateGenreModalOpen, setCreateGenreModalOpen] =
    useState<boolean>(false);
  const [isUploadBookModalOpen, setUploadBookModalOpen] =
    useState<boolean>(false);

  const debouncedValue = useDebounce(query);

  const { data, error, isLoading } = booksApiSlice.useGetBooksQuery<useGetQueryResponce<LocalBooksData>>({
    page,
    limit,
    query: debouncedValue,
  });

  useShowErrorToast(error);

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
    <Box sx={{ width: '100%' }} >
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1,width: '100%', display: 'flex', flexGrow: 1,'@media(max-width: 780px)' : { flexDirection: 'column'}, }}
      >
        <Box sx={{display: 'flex', flexGrow: 1, '@media(max-width: 780px)' : { width: '100%',  flexDirection: 'column', alignItems: 'center'}, }} >
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
            sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%', '@media(max-width: 780px)' : { m: '10px 0' }}}
          >
            Найти
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', '@media(max-width: 780px)' : { width: '100%', flexDirection: 'column', alignItems: 'center'}, }}>
          <Button
            variant="contained"
            sx={{ m: 2, '@media(max-width: 780px)' : { maxWidth: '20%'}, }}
            onClick={() => setUploadBookModalOpen(true)}
          >
            <CloudUploadIcon />
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2, '@media(max-width: 780px)' : { maxWidth: '20%'}, }}
            onClick={() => setCreateTagModalOpen(true)}
          >
            <AddIcon />
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2, '@media(max-width: 780px)' : { maxWidth: '20%'}, }}
            onClick={() => setCreateGenreModalOpen(true)}
          >
            <AddCircleIcon />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}
      >
        {booksCount && <CardsList items={data.books} renderItem={(book) => <LocalBookItem book={book} key={`book ${book.id}`} />} />}
        {!booksCount && !isLoading && <NoDataText />}
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
        {!!isLoading && <BooksSkeleton />}
      </Box>
      <UploadBookModal
        isModalOpen={isUploadBookModalOpen}
        setModalOpen={setUploadBookModalOpen}
      />
      <CreateTagModal
        isModalOpen={isCreateTagModalOpen}
        setModalOpen={setCreateTagModalOpen}
      />
      <CreateGenreModal
        isModalOpen={isCreateGenreModalOpen}
        setModalOpen={setCreateGenreModalOpen}
      />
    </Box>
  );
};

export default LocalBooks;
