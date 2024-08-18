import React, { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { ISeria } from '../constants/tsSchemes';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import CreateSeriaModal from '../containers/CreateSeriaModal';
import BooksSkeleton from '../skeletons/BooksSkeleton';
import { seriesApiSlice } from '../store/reducers/SeriesApiSlice';
import { useGetQueryResponce } from '../models/requests';
import CardsList from '../components/CardsList';
import SeriaItem from '../components/SeriaItem';

interface SeriesData {
  series: ISeria[];
  totalPages: number;
  page: number
}

const Series: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [isCreateSeriaModalOpen, setCreateSeriaModalOpen] =
    useState<boolean>(false);

  const debouncedValue = useDebounce(query);

  const { data, error, isLoading } = seriesApiSlice.useGetSeriesQuery<useGetQueryResponce<SeriesData>>({
    page,
    limit,
    query: debouncedValue,
  });

  useShowErrorToast(error);

  const seriesCount = data?.series?.length;

  useEffect(() => {
    if (query) {
      setPage(defaultStartPage);
    }
  }, [query]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query) {
      setPage(defaultStartPage);
    }
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (query) {
      window.scrollTo(0, 0);
    }
    setPage(value - 1);
  };

  return (
    <Box sx={{ width: '100%' }} >
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1, display: 'flex', gap: '20px', '@media(max-width: 780px)' : { flexDirection: 'column', alignItems: 'center', gap: '20px'} }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="query"
          label="Название"
          name="query"
          autoComplete="text"
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%', '@media(max-width: 780px)' : { m: '10px 0' } }}
        >
          Найти
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%', '@media(max-width: 780px)' : { m: 0 } }}
          onClick={() => setCreateSeriaModalOpen(true)}
        >
          <BookmarksIcon />
        </Button>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}
      >
        {seriesCount && <CardsList items={data.series} renderItem={(seria) => <SeriaItem seria={seria} key={`book ${seria.id}`} />} />}
        {!seriesCount && !isLoading && (
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
            {'Нет данных'}
          </Typography>
        )}
        {seriesCount && (
          <Pagination
            count={data.totalPages}
            color="primary"
            defaultPage={1}
            boundaryCount={2}
            page={page + 1}
            onChange={onPaginationChange}
          />
        )}
        {!!isLoading && <BooksSkeleton />}
      </Box>
      <CreateSeriaModal
        isModalOpen={isCreateSeriaModalOpen}
        setModalOpen={setCreateSeriaModalOpen}
      />
    </Box>
  );
};

export default Series;
