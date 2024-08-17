import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Image from '../components/Image/Image';
import { baseUrl } from '../constants/constants';
import TypographyComponent from '../components/TypographyComponent';
import moment from 'moment';
import { seriesApiSlice } from '../store/reducers/SeriesApiSlice';
import { IOneSeria } from '../constants/tsSchemes';
import { useGetQueryResponce } from '../models/requests';
import CardsList from '../components/CardsList';
import LocalBookItem from '../components/LocalBookItem';
import { useShowErrorToast } from '../hooks';
import NoDataText from '../components/NoDataText';

const Seria: FC = ({}) => {
  const { id } = useParams();

  const { data, error, isLoading } = seriesApiSlice.useGetSeriaQuery<useGetQueryResponce<IOneSeria>>(id);

  useShowErrorToast(error);

  return (
    <Box>
      <Box
        sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '20px' }}
      >
        <Image
          src={data?.cover ? `${baseUrl}/${data.cover}` : `/static/images/no-image.png`}
          alt="Book cover"
          height="300px"
          width="200px"
          styles={{ m: 0 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {!!data?.title && <TypographyComponent title={'Название:'} data={data.title} />}
          {!!data?.annotation && (
            <TypographyComponent title={'Аннотация:'} data={data.annotation} />
          )}
          {!!data?.author && (
            <TypographyComponent title={'Авторы:'} data={data.author?.split(';')} />
          )}
          {!!data?.genres?.length && (
            <TypographyComponent
              title={'Жанры:'}
              data={data.genres?.map((item: { title: string }) => item.title)}
            />
          )}
          {!!data?.release_date && (
            <TypographyComponent
              title={'Дата выхода:'}
              type='line'
              data={moment(data.release_date).format('DD.MM.YYYY')}
            />
          )}
          {!!data?.tags?.length && (
            <TypographyComponent
              title={'Тэги:'}
              data={data.tags?.map((item: { title: string }) => item.title)}
            />
          )}
        </Box>
      </Box>
      {!!data?.seriabooks?.length && <CardsList items={data.seriabooks} renderItem={(book) => <LocalBookItem book={book} key={`book ${book.id}`} type="seria" />} />}
      {!data?.seriabooks?.length && !isLoading && <NoDataText text='В данной серии нет книг :/' />}
    </Box>
  );
};

export default Seria;
