import React, { FC, useState } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

import Book from '../../components/BookItem/index';
import { BooksResponceType, BookType } from '../../constants/tsSchemes';

type BooksComponentType = {
    books: BooksResponceType;
    getBooks: (query: string, page?: number, limit?: number, ) => Promise<any>;
    // getAuthors: (query: string, page?: number, limit?: number, ) => Promise<any>;
};

export const Books: FC<BooksComponentType> = ({ books, getBooks }) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    // const [queryType, setQueryType] = useState('');

    const booksCount = books?.items?.length;

    console.log(books)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(query);
        if (query) {
            setPage(0);
            getBooks(query);
        }
    };

    const onPaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (query) {
            window.scrollTo(0, 0);
            setPage(value - 1);
            getBooks(query, value - 1);
        }
    }

    // const onSelectChange = (event: SelectChangeEvent) => {
    //     setQueryType(event.target.value);
    // };

    return (
        <Box sx={{width: '100%'}}>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, display: 'flex'}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="query"
                    label="Название"
                    name="query"
                    autoComplete="text"
                    autoFocus
                    onChange={(e:any) => setQuery(e.currentTarget.value)}
                />
                {/* <FormControl sx={{minWidth: '20%', ml: 1}} margin="normal">
                    <InputLabel id="select-type-query-label">Тип</InputLabel>
                    <Select
                    required
                    labelId="select-type-query-label"
                    id="demo-simple-select-autowidth"
                    value={queryType}
                    onChange={onSelectChange}
                    autoWidth
                    label="Тип"
                    >
                        <MenuItem value={'books'}>Книги</MenuItem>
                        <MenuItem value={'authors'}>Авторы</MenuItem>
                        <MenuItem value={'series'}>Серии</MenuItem>
                        <MenuItem value={'genres'}>Жанры</MenuItem>
                    </Select>
                </FormControl> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%' }}
                >
                    Найти
                </Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {booksCount && <List sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%', bgcolor: 'background.paper' }}>
                    {books.items.map((book: BookType, index: number) => <Book book={book} key={`book ${index}`} />)}
                </List>}
                {!booksCount && 
                    <Typography
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, fontSize: 22 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {'Нет данных'}
                    </Typography>}
                {booksCount && <Pagination 
                    count={books.totalPages} 
                    color="primary"
                    defaultPage={1} 
                    boundaryCount={2} 
                    page={page + 1} 
                    onChange={onPaginationChange} 
                />
            }
            </Box>
        </Box>
    );
};
