import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import Image from './Image/Image';
import { BookType } from '../constants/tsSchemes';

type BookItemType = {
  book: BookType;
};

const BookItem: FC<BookItemType> = ({ book }) => {
  const { cover, title, author, categories, downloads } = book;

  return (
    <ListItem
      sx={{
        flexGrow: 1,
        flexBasis: 500,
        bgcolor: '#cad2de',
        display: 'flex',
        justifySelf: 'center',
      }}
    >
      <Image
        src={
          cover
            ? `http://flibusta.site/${cover}`
            : `/static/images/no-image.png`
        }
        alt="Book cover"
        height="300px"
        width="200px"
        styles={{ m: 0 }}
      />
      <ListItemText
        sx={{ ml: 1 }}
        primary={title}
        secondary={
          <>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'author title'}
            >
              Авторы:
            </Typography>
            {author.map((item, index) => (
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="span"
                variant="body2"
                color="text.primary"
                key={`author ${index}`}
              >
                {item.name}
              </Typography>
            ))}
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'cotegory title'}
            >
              Жанры:
            </Typography>
            {categories.map((item, index) => (
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="span"
                variant="body2"
                color="text.secondary"
                key={`category ${index}`}
              >
                {item}
              </Typography>
            ))}
            <Typography
              sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mt: 2 }}
              component="span"
              variant="body2"
            >
              {downloads?.map((item, index) => (
                <Button
                  key={`download button ${index}`}
                  variant="outlined"
                  href={`http://flibusta.site/${item.link}`}
                  endIcon={<DownloadIcon />}
                >
                  {item.type.replace('application/', '')}
                </Button>
              ))}
              {!!downloads?.length && (
                <Button
                  key={`save button`}
                  variant="outlined"
                  endIcon={<ArrowUpwardIcon />}
                >
                  {'Сохранить'}
                </Button>
              )}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default BookItem;
