import React from 'react';
import { List } from '@mui/material';

interface CardsListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function CardsList<T> (props: CardsListProps<T>) {
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
            {props.items?.map(props.renderItem)}
        </List>
    )
};
