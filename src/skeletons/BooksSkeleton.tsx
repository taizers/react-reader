import * as React from 'react';
import { Box } from '@mui/material';
import BookSkeleton from './BookSkeleton';

const BooksSkeleton = () =>  {
  return (
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        <BookSkeleton />
        <BookSkeleton />
        <BookSkeleton />
        <BookSkeleton />
    </Box>
  );
};

export default BooksSkeleton;
