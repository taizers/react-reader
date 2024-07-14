import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import { Box } from '@mui/material';
import Image from '../components/Image/Image';
import { baseUrl } from '../constants';
import TypographyComponent from '../components/TypographyComponent';
import moment from 'moment';

type BookType = {
  // book: any;
  // getBook: (id: string) => void;
};

const LocalBook: FC<BookType> = ({}) => {
    const { id } = useParams();

    const {
        data: book,
        error,
        isLoading,
    } = booksApiSlice.useGetBookQuery(id);

    const {cover, title, author, genres, downloads, link, annotation, created_at, deleted_at, primory_link, release_date, seria, source, tags, updated_at } = book || {};

    // return <>{JSON.stringify(book)}</>;
    return (
        <Box sx={{display: 'flex', width: '100%', flexWrap: 'wrap' , gap: '20px'}}>
            <Image
                src={
                    cover
                    ? `${baseUrl}/${cover}`
                    : `/static/images/no-image.png`
                }
                alt="Book cover"
                height='300px'
                width='200px'
                styles={{m: 0}}
            />
            <Box sx={{flexGrow: 1,}}>
                {!!annotation && <TypographyComponent title={'Аннотация:'} data={annotation} />}
                {!!author && <TypographyComponent title={'Авторы:'} data={author?.split(';')} />}
                {!!genres?.length && <TypographyComponent title={'Жанры:'} data={genres?.map((item: {title: string}) => item.title)} />}
                {!!release_date && <TypographyComponent title={'Дата выхода:'} data={moment(release_date).format("DD.MM.YYYY")} />}
                {!!seria && <TypographyComponent title={'Серия: '} data={seria} />}
                {!!source && <TypographyComponent title={'Ресурс: '} data={source} />}
                {!!tags?.length && <TypographyComponent title={'Тэги:'} data={tags?.map((item: {title: string}) => item.title)} />}
            </Box>
        </Box>
    );
};

export default LocalBook;
