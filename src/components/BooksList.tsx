import React from 'react';
import { List } from '@mui/material';

interface BookListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function BookList<T> (props: BookListProps<T>) {
    return (
        <List
            sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 2,
            width: '100%',
            bgcolor: 'background.paper',
            }}
        >
            {props.items.map(props.renderItem)}
        </List>
    )
};
