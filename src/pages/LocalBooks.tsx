import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { ILocalBook } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import UploadBookModal from '../containers/UploadBookModal';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import LocalBookItem from '../components/LocalBookItem';
import CreateTagModal from '../containers/CreateTagModal';
import CreateGenreModal from '../containers/CreateGenreModal';
import DeleteModal from '../containers/DeleteModal';
import CreateSeriaModal from '../containers/CreateSeriaModal';
import { libraryBooksApiSlice } from '../store/reducers/LibraryBooksApiSlice';
import BooksSkeleton from '../skeletons/BooksSkeleton';
import BookList from '../components/BooksList';
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
  const [isCreateSeriaModalOpen, setCreateSeriaModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const debouncedValue = useDebounce(query);

  const { data, error, isLoading } = booksApiSlice.useGetBooksQuery<useGetQueryResponce<LocalBooksData>>({
    page,
    limit,
    query: debouncedValue,
  });

  const [
    deleteBook,
    { data: deleteData, error: deleteError, isLoading: deleteIsLoading },
  ] = booksApiSlice.useDeleteBookMutation();
  const [
    updateLibraryBook,
    { data: updateLibraryBookData, error: updateLibraryBookError, isLoading: updateLibraryBookIsLoading },
  ] = libraryBooksApiSlice.useUpdateLibraryBookMutation();

  useShowErrorToast(error);
  useShowErrorToast(deleteError);
  useShowErrorToast(updateLibraryBookError);

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
    <Box sx={{ width: '100%' }} >
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
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
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => setCreateSeriaModalOpen(true)}
        >
          <BookmarksIcon />
        </Button>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}
      >
        {booksCount && <BookList items={data.books} renderItem={(book) => <LocalBookItem updateLibraryBook={updateLibraryBook} book={book} key={`book ${book.id}`} deleteBook={onDeleteBook} />} />}
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
      <DeleteModal
        deleteFunction={onDelete}
        deleteLabel="Книгу"
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
      <CreateSeriaModal
        isModalOpen={isCreateSeriaModalOpen}
        setModalOpen={setCreateSeriaModalOpen}
      />
    </Box>
  );
};

export default LocalBooks;
