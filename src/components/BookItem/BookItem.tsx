import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

import Image from '../Image/index';
import { BookType } from '../../constants/tsSchemes';

type BookItemType = {
  book: BookType;
}

export const BookItem: FC<BookItemType> = ({ book }) => {
    const { cover, title, author, categories, downloads } = book;

    return (
        <ListItem alignItems="flex-start" sx={{maxWidth: 500, bgcolor: '#cad2de', mb: 1}}>
            <ListItemAvatar>
              <Image src={cover ? `http://flibusta.site/${cover}` : `/static/images/NoCover.jpg`} alt="Book cover" height={300} width={200} />
            </ListItemAvatar>
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
                  {author.map((item, index)=> 
                    <Typography
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      key={`author ${index}`}
                    >
                      {item.name}
                    </Typography>
                  )}
                  <Typography
                    sx={{ display: 'flex', flexDirection: 'column', mt: 1  }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    key={'cotegory title'}
                  >
                    Жанры:
                  </Typography>
                  {categories.map((item, index)=> 
                    <Typography
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      key={`category ${index}`}
                    >
                      {item}
                    </Typography>
                  )}
                  <Typography
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mt: 2 }}
                      component="span"
                      variant="body2"
                    >
                      {downloads?.map((item, index)=> 
                        <Button key={`download button ${index}`} variant="outlined" href={`http://flibusta.site/${item.link}`} endIcon={<DownloadIcon />}>
                          {item.type.replace('application/','')}
                        </Button>
                      )}
                  </Typography>
                </>
              }
            />
          </ListItem>
    )
}
