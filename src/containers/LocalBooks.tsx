import React, { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { BookType, LocalBookType } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import UploadBookModal from './UploadBookModal';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import LocalBookItem from '../components/LocalBookItem';
import CreateTagModal from './CreateTagModal';
import CreateGenreModal from './CreateGenreModal';
import DeleteModal from './DeleteModal';

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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const debouncedValue = useDebounce(query);

  const { data, error, isLoading } = booksApiSlice.useGetBooksQuery({
    page,
    limit,
    query: debouncedValue,
  });

  const [
    deleteBook,
    { data: deleteData, error: deleteError, isLoading: deleteIsLoading },
  ] = booksApiSlice.useDeleteBookMutation();

  useShowErrorToast(error);
  useShowErrorToast(deleteError);

  const booksCount = data?.books?.length;

  useEffect(() => {
    if (query) {
      setPage(defaultStartPage);
    }
  }, [query]);

  useEffect(() => {
    if (!!deleteData) {
      setDeleteModalOpen(false);
    }
  }, [deleteData]);

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

  const onDeleteBook = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const onDelete = () => {
    deleteBook(deleteId);
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
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => setUploadBookModalOpen(true)}
        >
          <CloudUploadIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => setCreateTagModalOpen(true)}
        >
          <AddIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => setCreateGenreModalOpen(true)}
        >
          <AddCircleIcon />
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
            {data.books.map((book: LocalBookType, index: number) => (
              <LocalBookItem
                book={book}
                key={`book ${index}`}
                deleteBook={onDeleteBook}
              />
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
      <DeleteModal
        deleteFunction={onDelete}
        deleteLabel="Книгу"
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </Box>
  );
};

export default LocalBooks;
