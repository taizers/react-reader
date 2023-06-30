import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import Image from '../Image/index';
import { AuthorRType } from '../../constants/tsSchemes';

type AuthorItemType = {
  authors: AuthorRType;
}

export const AuthorItem: FC<AuthorItemType> = ({ authors }) => {
    const { cover, title, author, categories } = authors;

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
                </>
              }
            />
          </ListItem>
    )
}
