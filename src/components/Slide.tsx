import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

import { Box } from '@mui/material';

type SlideItemType = {
  data: {
    title: string;
    content: string;
  };
};

const Slide: FC<SlideItemType> = ({ data }) => {
  return (
    <Box>
      <Typography
        sx={{ textIndent: '30px' }}
        component="h3"
        variant="h4"
        color="text.primary"
      >
        {data.title}
      </Typography>
      <Box>
        {data.content?.split('\n').map((item: string, index: number) => {
          return (
            <Typography
              sx={{ textIndent: '30px', fontSize: '1.8vw', '@media(max-width: 780px)' : {fontSize: '2.5vw'}, '@media(max-width: 550px)' : {fontSize: '3.3vw'}, '@media(max-width: 420px)' : {fontSize: '4.3vw'} }}
              component="p"
              color="text.primary"
              key={index}
            >
              {item}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default Slide;
