import React, { FC } from 'react';
import { StyledImage } from './styled';
import { Box } from '@mui/material';

type ImageType = {
  src: string;
  alt: string;
  width: string;
  height: string;
  styles?: object;
  onClick?: () => void;
};

const Image: FC<ImageType> = ({ src, alt, width, height, styles, onClick }) => {
  return <Box sx={{width: width, height: height, ...styles}} onClick={onClick}>
      <StyledImage src={src} width={'100%'} height={'100%'} alt={alt} />
    </Box>;
};
export default Image;
