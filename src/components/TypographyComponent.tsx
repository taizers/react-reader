import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type TypographyType = {
  title?: string;
  sx?: object;
  data: string | string[];
  type?: 'line' | 'column';
  link?: string,
};

const getTypography = (data: string | string[]) => {
  if (typeof data === 'string') {
    return (
      <Typography
        sx={{ display: 'flex', flexDirection: 'column' }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        {data}
      </Typography>
    );
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
  ));
};

const TypographyComponent: FC<TypographyType> = ({ title, data, sx, type='column', link }) => {
  let styles = {...sx, mt: 1,} as object;

  if (type === 'column') {
    styles = {...styles, display: 'flex', flexDirection: 'column',};
  }
  if (type === 'line') {
    styles = {...styles, display: 'flex', gap: '5px'};
  }

  if (link) {
    return (
      <Box sx={styles}>
        {!!title && <Typography
          component="span"
          variant="body2"
          color="text.primary"
          key={'title'}
        >
          {title}
        </Typography>}
        <Link to={link}>
          <Typography
            sx={{ color: 'blue' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {data}
          </Typography>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={styles}>
      {!!title && <Typography
        component="span"
        variant="body2"
        color="text.primary"
        key={'title'}
      >
        {title}
      </Typography>}
      {getTypography(data)}
    </Box>
  );
};

export default TypographyComponent;
