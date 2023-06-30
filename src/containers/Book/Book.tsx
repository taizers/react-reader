import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';


type BookType = {
    book: any;
    // getBook: (id: string) => void;
};

export const Book: FC<BookType> = ({book}) => {
    const { id } = useParams();

    useEffect(()=>{
        if (id) {
            // getBook(id);
        }
    },[])

    return (
        <>
        </>
    )
}
