import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
import { defaultChaptureValue, defaultScrollValue } from '../constants/constants';

const getAuthor = (author: any) => {
  let str = '';

  for (const key in author) {
    str += author[key] + '  ';
  }

  return str;
};

const getChangeChapterButtons = (
  setChapterValue: (value: number) => void,
  currentChapterValue: number,
  countOfChapters: number,
) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', '@media(max-width: 400px)' : { flexDirection: 'column' } }}>
      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={() =>currentChapterValue > defaultChaptureValue && setChapterValue(currentChapterValue - 1)}
      >
        <ArrowBackIcon />
      </Button>
      <Box sx={{ alignSelf: 'center', display: 'flex', '@media(max-width: 400px)' : { order: -1 } }}>
        <Box >{'Страница: '}</Box>
        <Box>{`${currentChapterValue + 1} из ${countOfChapters}`}</Box>
      </Box>
      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={() => currentChapterValue < countOfChapters - 1 && setChapterValue(currentChapterValue + 1)}
      >
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};

const getLang = (searchParams: string) => {
  const paramsArr = searchParams.split('&');

  const lang = paramsArr.find(item => item.includes('lang'));

  if (lang) {
    return lang.split('=')[1];
  } else {
    return undefined;
  }
};

interface ReadData {
  text: BookText;
  title: string;
}

const ReadBook: FC = () => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState<number>(defaultChaptureValue);
  const [fontSize, setFontSize] = useState<number>(16);
  const [font, setFont] = useState<string>('Roboto');
  const [searchParams, setSearchParams] = useSearchParams();
  const [defaultLastScrollPosition, setDefaultLastScrollPosition] =
    useState<number>();

  const ref = useRef<{font: string, fontSize: number, chapter: number, scroll: number}>(null!);

  const { data, error } = booksApiSlice.useGetBooksTextQuery<useGetQueryResponce<ReadData>>({id, lang: getLang(searchParams.toString())});

  const chapters = data?.text?.content?.map(item =>  item.title || item.content.trim().slice(0,10));

  useShowErrorToast(error);

  const onScroll = () => {
    const scroll = Math.round(window.scrollY);

    ref.current.scroll = scroll;
  };

  useEffect(() => {
    const settings = JSON.parse(getToken(`book ${id} settings`) || '{}');

    if (settings?.font) {
      setCurrentChapter(settings.chapter);
      setDefaultLastScrollPosition(settings.scroll);
      setFontSize(settings.fontSize);
      setFont(settings.font);

      ref.current = {font: settings.font, fontSize: settings.fontSize, chapter: settings.chapter, scroll: settings.scroll};
    } else {
      ref.current = {font, fontSize, chapter: currentChapter, scroll: defaultScrollValue};
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      setToken(JSON.stringify(ref.current), `book ${id} settings`);
    }
  }, []);

  useEffect(() => {
    if (defaultLastScrollPosition !== undefined ) {
        setTimeout(() => {
            window.scrollTo(defaultScrollValue, defaultLastScrollPosition);
        }, 200)
    }
  }, [defaultLastScrollPosition]);


  const handleScrollPositionChange = (data: number) => {
    ref.current.scroll = data;
  }
  const handleChapterChange = (data: number) => {
    setCurrentChapter(data);
    ref.current.chapter = data;
    handleScrollPositionChange(defaultScrollValue);
    window.scrollTo(defaultScrollValue, defaultScrollValue);
  }
  const handleFontChange = (data: string) => {
    setFont(data);
    ref.current.font = data;
  }
  const handleFontSizeChange = (data: number) => {
    setFontSize(data);
    ref.current.fontSize = data;
  }

  //TODO добавить синхронизацию последней страницы с бэкендом

  return (
    <Box sx={{pb:3}}>
      <BookBar setFont={handleFontChange} font={font} setFontSize={handleFontSizeChange} fontSize={fontSize} chapterInfo={{chapters, currentChapter, setCurrentChapter: handleChapterChange}} />
      <Box sx={{overflowY: 'auto'}}>
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
                handleChapterChange,
                currentChapter,
                data?.text?.content?.length,
              )}
            {currentChapter !== undefined && data?.text?.content.length && (
              <Slide data={data?.text?.content[currentChapter]} fontSize={fontSize} font={font} />
            )}
            {currentChapter !== undefined &&
              id &&
              getChangeChapterButtons(
                handleChapterChange,
                currentChapter,
                data?.text?.content?.length,
              )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReadBook;
