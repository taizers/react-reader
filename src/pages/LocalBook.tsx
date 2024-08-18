import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import { Box, Button } from '@mui/material';
import Image from '../components/Image/Image';
import { baseUrl } from '../constants/constants';
import TypographyComponent from '../components/TypographyComponent';
import moment from 'moment';
import { useShowErrorToast } from '../hooks';
import { useGetQueryResponce } from '../models/requests';
import { ILocalBook } from '../constants/tsSchemes';


const LocalBook: FC = ({}) => {
  const { id } = useParams();

  const { data, error, isLoading } = booksApiSlice.useGetBookQuery<useGetQueryResponce<ILocalBook>>(id);

  useShowErrorToast(error);

  const {
    cover,
    title,
    author,
    genres,
    annotation,
    release_date,
    seriabooks,
    source,
    tags,
  } = data || {};

  return (
    <Box>
      <Box
        sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '20px', '@media(max-width: 780px)' : { flexDirection: 'column', alignItems: 'center'} }}
      >
        <Image
          src={cover ? `${baseUrl}/${cover}` : `/static/images/no-image.png`}
          alt="Book cover"
          height="320px"
          width="200px"
          styles={{ m: 0, boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.7)', '@media(min-width: 780px)' : {width:"200px", height:"320px"}}}
        />
        <Box sx={{ flexGrow: 1, '@media(max-width: 780px)' : { alignSelf: 'start'} }}>
          {!!title && <TypographyComponent title={'Название:'} data={title} />}
          {!!annotation && (
            <TypographyComponent title={'Аннотация:'} data={annotation} />
          )}
          {!!author && (
            <TypographyComponent title={'Авторы:'} data={author?.split(';')} />
          )}
          {!!genres?.length && (
            <TypographyComponent
              title={'Жанры:'}
              data={genres?.map((item: { title: string }) => item.title)}
            />
          )}
          {!!release_date && (
            <TypographyComponent
              title={'Дата выхода:'}
              data={moment(release_date).format('DD.MM.YYYY')}
            />
          )}
          {!!seriabooks && <TypographyComponent title={'Серия: '} type={'line'} link={`/series/${seriabooks.id}`} data={seriabooks.title} />}
          {!!source && <TypographyComponent title={'Ресурс: '} type={'line'}  data={source} />}
          {!!tags?.length && (
            <TypographyComponent
              title={'Тэги:'}
              data={tags?.map((item: { title: string }) => item.title)}
            />
          )}
        </Box>
        <Box>
            <Button variant="contained" href={`/local-books/${id}/read`}>{'Читать'}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LocalBook;
