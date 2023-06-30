import React, { FC } from 'react';

type ImageType = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export const Image: FC<ImageType> = ({src, alt, width, height}) => {
    return (
        <img src={src} width={width} height={height} alt={alt} />
    )
}
