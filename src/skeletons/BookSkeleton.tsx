import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

const BookSkeleton = () =>  {
  return (
    <Box sx={{display: 'flex', gap: '20px', flexGrow: 1, flexBasis: 500,}}>
        <Skeleton variant="rounded" width={200} height={300} />
        <Box >
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={250} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
            <Box sx={{display: 'flex', gap: '20px', mt: '20px'}}>
                <Skeleton variant="rectangular" width={50} height={30} />
                <Skeleton variant="rectangular" width={50} height={30} />
                <Skeleton variant="rectangular" width={50} height={30} />
            </Box>
            <Skeleton sx={{mt: '20px'}} variant="rectangular" width={150} height={30} />
        </Box>
    </Box>
  );
};

export default BookSkeleton;
