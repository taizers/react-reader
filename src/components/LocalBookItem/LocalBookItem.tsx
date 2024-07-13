import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

import { StyledListItemAvatar } from './styled';
import Image from '../Image/Image';
import { LocalBookType } from '../../constants/tsSchemes';
import { baseUrl } from '../../constants';
import TypographyComponent from '../TypographyComponent';

type LocalBookItemType = {
  book: LocalBookType;
  deleteBook: (id: number) => void;
};

const LocalBookItem: FC<LocalBookItemType> = ({ book, deleteBook }) => {
  const { cover, title, author, categories, downloads, link, id, annotation, created_at, deleted_at, primory_link, release_date, seria, source, tags, updated_at } = book;

  return (
    <ListItem
      sx={{ 
        flexGrow: 1,
        flexBasis: 500,
        bgcolor: '#f1f4f862',
        display: 'flex',
        justifySelf: 'center'
      }}
    >
      <StyledListItemAvatar>
        <Image
          src={
            cover
              ? `${baseUrl}/${cover}`
              : `/static/images/no-image.png`
          }
          alt="Book cover"
        />
      </StyledListItemAvatar>
      <ListItemText
        sx={{ ml: 1, alignSelf: 'start' }}
        primary={title}
        secondary={
          <>
            {annotation && <TypographyComponent title={'Аннотация:'} data={annotation} />}
            {author && <TypographyComponent title={'Авторы:'} data={author?.split(';')} />}
            {categories && <TypographyComponent title={'Жанры:'} data={categories?.split(';')} />}
            {release_date && <TypographyComponent title={'Дата выхода:'} data={moment(release_date).format("DD.MM.YYYY")} />}
            {seria && <TypographyComponent title={'Серия: '} data={seria} />}
            {source && <TypographyComponent title={'Ресурс: '} data={source} />}
            {tags && <TypographyComponent title={'Тэги:'} data={tags?.split(';')} />}
            <Typography
              sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mt: 2 }}
              component="span"
              variant="body2"
            >
              <Button
                href={`${baseUrl}/${link}`}
              >
                <DownloadIcon />
              </Button>
              <Button
                onClick={() => {deleteBook(id)}}
              >
                <DeleteIcon />
              </Button>
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default LocalBookItem;
