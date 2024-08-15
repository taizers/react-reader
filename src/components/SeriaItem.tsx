import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import Image from './Image/Image';
import { ILocalBook } from '../constants/tsSchemes';
import { baseUrl } from '../constants/constants';
import TypographyComponent from './TypographyComponent';

type SeriaItemType = {
  book: ILocalBook;
  updateSeria: (data: {ids: object, payload: object}) => void;
};

const SeriaItem: FC<SeriaItemType> = ({ book, updateSeria }) => {
  const {
    cover,
    title,
    author,
    genres,
    downloads,
    link,
    id,
    library_book,
    annotation,
    created_at,
    deleted_at,
    primory_link,
    release_date,
    seria,
    source,
    tags,
    updated_at,
  } = book;

  let history = useNavigate();

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
          history(`/seria/${id}`);
        }}
        src={cover ? `${baseUrl}/${cover}` : `/static/images/no-image.png`}
        alt="Book cover"
        height="300px"
        width="200px"
        styles={{ m: 0, boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.7)' }}
      />
      <ListItemText
        sx={{ ml: 1, alignSelf: 'start' }}
        primary={title}
        secondary={
          <>
            {author && (
              <TypographyComponent
                title={'Авторы:'}
                data={author?.split(';')}
              />
            )}
            {genres?.length && (
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
            {tags?.length && (
              <TypographyComponent
                title={'Тэги:'}
                data={tags?.map((item) => item.title)}
              />
            )}
          </>
        }
      />
    </ListItem>
  );
};

export default SeriaItem;
