import React, { FC, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import GppBadIcon from '@mui/icons-material/GppBad';
import { useNavigate } from 'react-router-dom';

import Image from './Image/Image';
import { ILocalBook, stateValuesType } from '../constants/tsSchemes';
import { baseUrl } from '../constants/constants';
import TypographyComponent from './TypographyComponent';
import LibraryBookStatusComponent from './LibraryBookStatusComponent';
import { useAppSelector, useShowErrorToast } from '../hooks';
import { libraryBookStatuses } from '../constants/constants';
import { Box, Tooltip } from '@mui/material';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import { libraryBooksApiSlice } from '../store/reducers/LibraryBooksApiSlice';
import DeleteModal from '../containers/DeleteModal';
import { Link } from 'react-router-dom';

type LocalBookItemType = {
  book: ILocalBook;
  type?: 'local' | 'library' | 'seria';
};

const LocalBookItem: FC<LocalBookItemType> = ({ book, type = 'local' }) => {
  const {
    cover,
    title,
    author,
    genres,
    user_id,
    link,
    id,
    UsersBooks,
    release_date,
    seriabooks,
    tags,
    privat,
  } = book;
  let history = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);


  const { user } = useAppSelector((state) => state.auth);

  const [
    updateLibraryBook,
    { data: updateLibraryBookData, error: updateLibraryBookError, isLoading: updateLibraryBookIsLoading },
  ] = libraryBooksApiSlice.useUpdateLibraryBookMutation();
  const [
    updateBook,
    { data: updateBookData, error: updateBookError, isLoading: updateBookIsLoading },
  ] = booksApiSlice.useUpdateBookMutation();
  const [
    deleteBook,
    { data: deleteData, error: deleteError, isLoading: deleteIsLoading },
  ] = booksApiSlice.useDeleteBookMutation();

  useShowErrorToast(updateBookError);
  useShowErrorToast(updateLibraryBookError);
  useShowErrorToast(deleteError);

  useEffect(() => {
    if (!!deleteData || !!updateBookData) {
      setDeleteModalOpen(false);
    }
  }, [deleteData, updateBookData]);

  const onDeleteBook = () => {
    setDeleteModalOpen(true);
  };

  const onDeleteBookFromLibrary = () => {
    const ids = {
      user_id: user?.id,
      book_id: id,
    };

    updateLibraryBook({ids, payload: {state: null}});
  };

  const onUpdateBookStatusAtLibrary = (state: stateValuesType) => {
    const ids = {
      user_id: user?.id,
      book_id: id,
    };

    const payload = {
      state,
    };

    updateLibraryBook({ids, payload});
  };

  const onUpdateBook = () => {
    updateBook({id, book: {privat: !privat}});
  }

  const getPrivateIcon = () => {
    if (privat) {
      return <Tooltip title="Отменить приватность"><GppBadIcon fontSize={'large'} /></Tooltip>;
    }

    if (!privat && user?.id.toString() === user_id.toString()) {
      return <Tooltip title="Сделать приватной"><HealthAndSafetyIcon fontSize={'large'} /></Tooltip>;
    }
  }

  const onDelete = () => {
    if (type === 'local') {
      deleteBook(id);
    }
    if (type === 'seria') {
      updateBook({id, book: {seria_id: null}});
    }
  }

  // TODO добавить поиск/страницу показывающий только приватные книги(свои)
  // TODO добавить кликабельность тэгов
  // TODO добавить кликабельность жанров
  return (
    <ListItem
      sx={{
        flexGrow: 1,
        flexBasis: 500,
        bgcolor: '#f1f4f862',
        display: 'flex',
        justifySelf: 'center',
      }}
    >
      <Image
        onClick={() => {
          history(`/local-books/${id}`);
        }}
        src={cover ? `${baseUrl}/${cover}` : `/static/images/no-image.png`}
        alt="Book cover"
        height="300px"
        width="200px"
        styles={{ m: 0, boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.7)' }}
      />
      <Box sx={{ ml: 1, alignSelf: 'start' }}>
        <Box>
          <Typography
            component="h3"
            variant="h6"
            color="text.primary"
          >
            {title}
          </Typography>
          {author && (
            <TypographyComponent
              title={'Авторы:'}
              data={author?.split(';')}
            />
          )}
          {!!genres?.length && (
            <TypographyComponent
              title={'Жанры:'}
              data={genres?.map((item) => item.title)}
            />
          )}
          {release_date && (
            <TypographyComponent
              title={'Дата выхода:'}
              type={'line'}
              data={moment(release_date).format('DD.MM.YYYY')}
            />
          )}
          {seriabooks?.title && <TypographyComponent link={`/series/${seriabooks.id}`} type={'line'} title={'Серия: '} data={seriabooks?.title} />}
          {!!tags?.length && (
            <TypographyComponent
              title={'Тэги:'}
              data={tags?.map((item) => item.title)}
            />
          )}
          {((!privat && user?.id.toString() === user_id.toString()) || privat) && <Box onClick={onUpdateBook}>
            {getPrivateIcon()}
          </Box>}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mt: 2 }}>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            href={`${baseUrl}/${link}`}
          >
            <DownloadIcon />
          </Button>
          {user?.id.toString() === user_id.toString() && (type === 'local' || type === 'seria') && <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => {
              onDeleteBook();
            }}
          >
            <DeleteIcon />
          </Button>}
          {UsersBooks !== undefined && <LibraryBookStatusComponent onDeleteFunction={onDeleteBookFromLibrary} onUpdateStatusFunction={onUpdateBookStatusAtLibrary} state={UsersBooks[0]?.library_book?.state} statuses={libraryBookStatuses} />}
        </Box>
        <DeleteModal
          deleteFunction={onDelete}
          deleteLabel="Книгу"
          isModalOpen={isDeleteModalOpen}
          setModalOpen={setDeleteModalOpen}
        />
      </Box>
    </ListItem>
  );
};

export default LocalBookItem;
