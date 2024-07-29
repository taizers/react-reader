import React, { FC } from 'react';
import { Typography } from '@mui/material';

const defaultNoDataText = 'Нет данных!'

interface NoDataTextProps {
    text?: string;
}

const NoDataText:FC<NoDataTextProps> = ({text = defaultNoDataText}) => {
  return (
    <Typography
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 10,
        fontSize: 22,
        }}
        component="span"
        variant="body2"
        color="text.primary"
    >
        {text}
    </Typography>
  );
};

export default NoDataText;