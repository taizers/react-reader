import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

import { Box } from '@mui/material';

type SlideItemType = {
  data: {
    title: string;
    content: string;
  };
  fontSize: number;
  font: string;
};

const Slide: FC<SlideItemType> = ({ data, fontSize, font }) => {
  return (
    <Box>
      <Typography
        sx={{ textIndent: '30px', fontSize: `${fontSize+4}px`, fontFamily: font }}
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
              sx={{ textIndent: '30px', fontSize: `${fontSize}px`, fontFamily: font }}
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
