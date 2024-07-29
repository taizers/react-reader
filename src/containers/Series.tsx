import React, { FC, useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { ILocalBook } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import UploadBookModal from './UploadBookModal';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import LocalBookItem from '../components/LocalBookItem';
import CreateTagModal from './CreateTagModal';
import CreateGenreModal from './CreateGenreModal';
import DeleteModal from './DeleteModal';
import CreateSeriaModal from './CreateSeriaModal';
import { libraryBooksApiSlice } from '../store/reducers/LibraryBooksApiSlice';
import BooksSkeleton from '../skeletons/BooksSkeleton';
import { seriesApiSlice } from '../store/reducers/SeriesApiSlice';
import { useGetQueryResponce } from '../models/requests';


const Series: FC = () => {
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

  const { data, error, isLoading } = seriesApiSlice.useGetSeriesQuery<useGetQueryResponce<any>>({
    page,
    limit,
    query: debouncedValue,
  });

  const [
    deleteSeria,
    { data: deleteData, error: deleteError, isLoading: deleteIsLoading },
  ] = seriesApiSlice.useDeleteSeriaMutation();
  const [
    updateSeria,
    { data: updateSeriaData, error: updateSeriaError, isLoading: updateSeriaIsLoading },
  ] = seriesApiSlice.useUpdateSeriaMutation();

  useShowErrorToast(error);
  useShowErrorToast(deleteError);
  useShowErrorToast(updateSeriaError);

  const booksCount = data?.series?.length;

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
    deleteSeria(deleteId);
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
          onClick={() => setCreateSeriaModalOpen(true)}
        >
          <BookmarksIcon />
        </Button>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}
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
            {data.books.map((book: ILocalBook, index: number) => (
              <LocalBookItem
                updateLibraryBook={updateSeriaData}
                book={book}
                key={`book ${index}`}
                deleteBook={onDeleteBook}
              />
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
      <DeleteModal
        deleteFunction={onDelete}
        deleteLabel="Серию"
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

export default Series;
