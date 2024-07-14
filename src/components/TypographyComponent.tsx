import { FC } from 'react';
import { Typography } from '@mui/material';

type TypographyType = {
    title: string;
    data: string | string[];
};

const getTypography = (data: string | string[]) => {
    if (typeof data === 'string') {
        return <Typography
        sx={{ display: 'flex', flexDirection: 'column' }}
        component="span"
        variant="body2"
        color="text.primary"
        >
        {data}
        </Typography>
    }

    return data?.map((item, index) => (
        <Typography
        sx={{ display: 'flex', flexDirection: 'column' }}
        component="span"
        variant="body2"
        color="text.primary"
        key={`author ${index}`}
        >
        {item}
        </Typography>
    ))
};

const TypographyComponent: FC<TypographyType> = ({title, data}) => {
  return (
    <>
        <Typography
            sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
            component="span"
            variant="body2"
            color="text.primary"
            key={'author title'}
        >
            {title}
        </Typography>
        {getTypography(data)}
    </>
  );
};

export default TypographyComponent;