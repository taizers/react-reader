import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import { Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image from '../components/Image/Image';
import { baseUrl } from '../constants/constants';
import TypographyComponent from '../components/TypographyComponent';
import moment from 'moment';
import { useShowErrorToast } from '../hooks';
import { useGetQueryResponce } from '../models/requests';
import { IBookTranslateItem, ILocalBookResponce } from '../constants/tsSchemes';
import SelectComponent from '../components/Select';

const LocalBook: FC = ({}) => {
  const { id } = useParams();
  const history = useNavigate();
  const [lang, setLang] = useState<string>(''!);
  const [langBook, setLangBook] = useState<string>(''!);

  const { data, error, isLoading } = booksApiSlice.useGetBookQuery<useGetQueryResponce<ILocalBookResponce>>(id);
  const { data: trlanslateVariantsListData, error: trlanslateVariantsListError } = booksApiSlice.useGetBooksTranslateListQuery<useGetQueryResponce<IBookTranslateItem[]>>('');
  const [ translateBook, { data: trlanslateData, error: trlanslateError, isLoading: translateIsloading }] = booksApiSlice.useTranslateBookMutation();
  
  useShowErrorToast(error);
  useShowErrorToast(trlanslateVariantsListError);
  useShowErrorToast(trlanslateError);

  useEffect(() => {
    if (data?.translates?.length) {
      let index = -1;

      data.translates.find((item, i) => {
        if (item.field === 'original') {
          index = i;
          return true;
        }
      });

      if (index !== -1) {
        setLangBook(index.toString());
      }
    }
  }, [data]);

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
  } = data?.book || {};

  const onReadBookButtonClick = () => {
    if (langBook === null || data.translates[+langBook].field === 'original') {
      return history(`/local-books/${id}/read`);
    }

    return history(`/local-books/${id}/read?lang=${data.translates[+langBook].field}`);
  }

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
        <Box  sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          {trlanslateVariantsListData &&<Box sx={{display: 'flex', gap: '20px'}}>
            <SelectComponent minWidth={200} disabled={translateIsloading} label={'Available Translations'} name={'Translate variants'} value={lang} setValue={setLang} index array={trlanslateVariantsListData?.map(item => item.label)} />
            <Button variant="contained" disabled={translateIsloading || lang === ''} onClick={()=> translateBook({id, lang: trlanslateVariantsListData[+lang].field })}>{translateIsloading ? 'Идёт перевод' : 'Перевести'}</Button>
            {translateIsloading && <CircularProgress color="inherit" />} 
          </Box>}
          {!!data?.translates.length && <Box sx={{display: 'flex', gap: '20px'}}>
              <SelectComponent minWidth={200} label={'Book Translations'} name={'Translate variants'} value={langBook} setValue={setLangBook} index array={data.translates?.map(item => item.label)} />

              <Button variant="contained" onClick={onReadBookButtonClick}>{'Читать'}</Button>
          </Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default LocalBook;
