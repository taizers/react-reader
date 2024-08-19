import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import { Box, Button } from '@mui/material';
import TypographyComponent from '../components/TypographyComponent';
import Slide from '../components/Slide';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getToken, setToken } from '../utils';
import { useShowErrorToast } from '../hooks';
import { useGetQueryResponce } from '../models/requests';
import { BookText } from '../constants/tsSchemes';
import BookBar from '../components/BookBar';

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

interface ReadData {
  text: BookText;
  title: string;
}

const ReadBook: FC = () => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState<number>();
  const [fontSize, setFontSize] = useState<number>(16);
  const [font, setFont] = useState<string>('Roboto');
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [defaultLastScrollPosition, setDefaultLastScrollPosition] =
    useState<number>();

  const { data, error, isLoading } = booksApiSlice.useGetBooksTextQuery<useGetQueryResponce<ReadData>>(id);

  const chapters = data?.text?.content?.map(item =>  item.title || item.content.trim().slice(0,10));

  useShowErrorToast(error);

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

  //TODO добавить синхронизацию последней страницы с бэкендом

  return (
    <Box sx={{position: 'relative'}}>
      {currentChapter && <BookBar setFont={setFont} font={font} setFontSize={setFontSize} fontSize={fontSize} chapterInfo={{chapters, currentChapter, setCurrentChapter}} />}
      <Box sx={{overflowY: 'auto', mt: '-63px'}}>
        <Box
          sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '20px' }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {!!data?.title && <TypographyComponent data={data.title} sx={{fontSize: '20px'}} />}
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
              sx={{ textIndent: '30px', fontSize: `${fontSize+4}px`, alignSelf: 'center', fontFamily: font }}
            >
              {data?.text?.title}
            </Box>
            <Box
              sx={{ textIndent: '30px', fontSize: `${fontSize+2}px`, alignSelf: 'center', fontFamily: font }}
            >{`Автор: ${getAuthor(data?.text?.author)}`}</Box>
            <Box>
              {data?.text?.annotation?.map((item: string, index: number) => {
                return (
                  <Box sx={{ textIndent: '30px', fontFamily: font }} key={index}>
                    {item}
                  </Box>
                );
              })}
            </Box>
            {data?.text?.genre && (
              <Box sx={{ textIndent: '30px', fontFamily: font }}>{`Жанры: ${data?.text?.genre?.join(
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
              <Slide data={data?.text?.content[currentChapter]} fontSize={fontSize} font={font} />
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
    </Box>
  );
};

export default ReadBook;
