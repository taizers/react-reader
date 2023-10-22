import React, { FC } from 'react';
import { StyledImage } from './styled';

type ImageType = {
  src: string;
  alt: string;
};

const Image: FC<ImageType> = ({ src, alt }) => {
  return <StyledImage src={src} width={'100%'} height={'100%'} alt={alt} />;
};
export default Image;
