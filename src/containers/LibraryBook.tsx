import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import { Box, Button } from '@mui/material';
import Image from '../components/Image/Image';
import { baseUrl } from '../constants/constants';
import TypographyComponent from '../components/TypographyComponent';
import moment from 'moment';
import Slide from '../components/Slide';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getToken, setToken } from '../utils';

type ILocalBook = {
  // book: any;
  // getBook: (id: string) => void;
};

const defaultScrollValue = 0;
const defaultChaptureValue = 0;

const getAuthor = (author: any) => {
  let str = '';

  for (const key in author) {
    str += author[key] + '  ';
  }

  return str;
};

const onChapterChange = (
  setCurrentChapter: (value: number) => void,
  setScrollValue: (value: number) => void,
  value: number,
  countOfChapters: number,
  operation: '+' | '-',
  bookId: string
) => {
  let operatedValue = value;

  if (operation === '+' && value < countOfChapters - 1) {
    operatedValue += 1;
  }
  if (operation === '-' && value > defaultChaptureValue) {
    operatedValue -= 1;
  }

  setScrollValue(defaultScrollValue);
  setCurrentChapter(operatedValue);
  window.scrollTo(defaultScrollValue, defaultScrollValue);
  setToken(`${operatedValue};${defaultScrollValue}`, `book ${bookId}`);
};

const getChangeChapterButtons = (
  setChapterValue: (value: number) => void,
  setScrollValue: (value: number) => void,
  currentChapterValue: number,
  countOfChapters: number,
  bookId: string
) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={() =>
          onChapterChange(
            setChapterValue,
            setScrollValue,
            currentChapterValue,
            countOfChapters,
            '-',
            bookId
          )
        }
      >
        <ArrowBackIcon />
      </Button>
      <Box sx={{ alignSelf: 'center' }}>{`Страница: ${
        currentChapterValue + 1
      } из ${countOfChapters}`}</Box>
      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={() =>
          onChapterChange(
            setChapterValue,
            setScrollValue,
            currentChapterValue,
            countOfChapters,
            '+',
            bookId
          )
        }
      >
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};

const LocalBook: FC<ILocalBook> = ({}) => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState<number>();
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [defaultLastScrollPosition, setDefaultLastScrollPosition] =
    useState<number>();

  const { data, error, isLoading } = booksApiSlice.useGetBookQuery(id);

  const {
    cover,
    title,
    author,
    genres,
    downloads,
    link,
    annotation,
    created_at,
    deleted_at,
    primory_link,
    release_date,
    seria,
    source,
    tags,
    updated_at,
  } = data?.book || {};

  useEffect(() => {
    const lastPageData = getToken(`book ${id}`)?.split(';');

    if (lastPageData?.length) {
      const lastPage = lastPageData[0] || defaultChaptureValue;
      const lastScrollPosition = lastPageData[1] || defaultScrollValue;

      setCurrentChapter(+lastPage);
      setDefaultLastScrollPosition(+lastScrollPosition);
    } else {
      setCurrentChapter(defaultChaptureValue);
      setScrollPosition(defaultScrollValue);

      setToken(`${defaultChaptureValue};${defaultScrollValue}`, `book ${id}`);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(Math.round(window.scrollY));
    };

    currentChapter !== undefined &&
      scrollPosition !== undefined &&
      setToken(`${currentChapter};${scrollPosition}`, `book ${id}`);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollPosition]);

  useEffect(() => {
    if (defaultLastScrollPosition !== undefined ) {
        setTimeout(() => {
            window.scrollTo(defaultScrollValue, defaultLastScrollPosition);
        }, 200)
    }
  }, [defaultLastScrollPosition]);

  return (
    <Box>
      <Box
        sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '20px' }}
      >
        <Image
          src={cover ? `${baseUrl}/${cover}` : `/static/images/no-image.png`}
          alt="Book cover"
          height="300px"
          width="200px"
          styles={{ m: 0 }}
        />
        <Box sx={{ flexGrow: 1 }}>
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
          {!!seria?.title && <TypographyComponent title={'Серия: '} data={seria.title} />}
          {!!source && <TypographyComponent title={'Ресурс: '} data={source} />}
          {!!tags?.length && (
            <TypographyComponent
              title={'Тэги:'}
              data={tags?.map((item: { title: string }) => item.title)}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            sx={{ textIndent: '30px', fontSize: '2vw', alignSelf: 'center' }}
          >
            {data?.text?.title}
          </Box>
          <Box
            sx={{ textIndent: '30px', alignSelf: 'center' }}
          >{`Автор: ${getAuthor(data?.text?.author)}`}</Box>
          <Box>
            {data?.text?.annotation?.map((item: string, index: number) => {
              return (
                <Box sx={{ textIndent: '30px' }} key={index}>
                  {item}
                </Box>
              );
            })}
          </Box>
          {data?.text?.genre && (
            <Box sx={{ textIndent: '30px' }}>{`Жанры: ${data?.text?.genre?.join(
              ', '
            )}`}</Box>
          )}

          {currentChapter !== undefined &&
            id &&
            getChangeChapterButtons(
              setCurrentChapter,
              setScrollPosition,
              currentChapter,
              data?.text?.content?.length,
              id
            )}
          {currentChapter !== undefined && data?.text?.content.length && (
            <Slide data={data?.text?.content[currentChapter]} />
          )}
          {currentChapter !== undefined &&
            id &&
            getChangeChapterButtons(
              setCurrentChapter,
              setScrollPosition,
              currentChapter,
              data?.text?.content?.length,
              id
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default LocalBook;
