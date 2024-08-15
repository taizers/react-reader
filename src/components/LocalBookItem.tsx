import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import ShieldIcon from '@mui/icons-material/Shield';
import { useNavigate } from 'react-router-dom';

import Image from './Image/Image';
import { ILocalBook } from '../constants/tsSchemes';
import { baseUrl } from '../constants/constants';
import TypographyComponent from './TypographyComponent';
import LibraryBookStatusComponent from './LibraryBookStatusComponent';
import { useAppSelector } from '../hooks';
import { libraryBookStatuses } from '../constants/constants';
import { Box } from '@mui/material';

type LocalBookItemType = {
  book: ILocalBook;
  deleteBook: (id: number) => void;
  updateLibraryBook: (data: {ids: object, payload: object}) => void;
};

const LocalBookItem: FC<LocalBookItemType> = ({ book, deleteBook, updateLibraryBook }) => {
  const {
    cover,
    title,
    author,
    genres,
    downloads,
    link,
    id,
    annotation,
    created_at,
    deleted_at,
    primory_link,
    UsersBooks,
    release_date,
    seria,
    source,
    tags,
    privat,
  } = book;
  let history = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const onDeleteBookFromLibrary = () => {
    const ids = {
      user_id: user?.id,
      book_id: id,
    };

    updateLibraryBook({ids, payload: {state: null}});
  };

  const onUpdateBookStatusAtLibrary = (state: unknown) => {
    console.log(state)
    const ids = {
      user_id: user?.id,
      book_id: id,
    };

    const payload = {
      state,
    };

    updateLibraryBook({ids, payload});
  };
  // TODO добавить изменение privat на иконку щита
  // TODO добавить поиск/страницу показывающий только приватные книги(свои)

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
          history(`/read/${id}`);
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
              data={moment(release_date).format('DD.MM.YYYY')}
            />
          )}
          {seria && <TypographyComponent title={'Серия: '} data={seria.title} />}
          {!!tags?.length && (
            <TypographyComponent
              title={'Тэги:'}
              data={tags?.map((item) => item.title)}
            />
          )}
          {!!privat && <ShieldIcon />}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mt: 2 }}>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            href={`${baseUrl}/${link}`}
          >
            <DownloadIcon />
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => {
              deleteBook(id);
            }}
          >
            <DeleteIcon />
          </Button>
          {UsersBooks !== undefined && <LibraryBookStatusComponent onDeleteFunction={onDeleteBookFromLibrary} onUpdateStatusFunction={onUpdateBookStatusAtLibrary} state={UsersBooks[0]?.library_book?.state} statuses={libraryBookStatuses} />}
        </Box>
      </Box>
    </ListItem>
  );
};

export default LocalBookItem;
