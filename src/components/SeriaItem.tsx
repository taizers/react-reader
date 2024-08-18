import React, { FC, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import Image from './Image/Image';
import { ISeria } from '../constants/tsSchemes';
import { baseUrl } from '../constants/constants';
import TypographyComponent from './TypographyComponent';
import { useAppSelector, useShowErrorToast } from '../hooks';
import { Box } from '@mui/material';
import DeleteModal from '../containers/DeleteModal';
import { seriesApiSlice } from '../store/reducers/SeriesApiSlice';

type SeriaItemType = {
  seria: ISeria;
};

const SeriaItem: FC<SeriaItemType> = ({ seria }) => {
  const {
    annotation,
    author,
    cover,
    id,
    release_date,
    booksCount,
    title,
    genres,
    tags,
    user_id
  } = seria;
  let history = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);

  const [
    deleteSeria,
    { data: deleteData, error: deleteError, isLoading: deleteIsLoading },
  ] = seriesApiSlice.useDeleteSeriaMutation();

  useShowErrorToast(deleteError);

  useEffect(() => {
    if (!!deleteData) {
      setDeleteModalOpen(false);
    }
  }, [deleteData]);

  const onDeleteSeria = () => {
    setDeleteModalOpen(true);
  };

  const onDelete = () => {
    deleteSeria(id);
  };


  return (
    <ListItem
      sx={{
        flexGrow: 1,
        flexBasis: 500,
        bgcolor: '#f1f4f862',
        display: 'flex',
        justifySelf: 'center',
        '@media(max-width: 1000px)' : { justifyContent: 'space-evenly', flexBasis: 300, flexDirection: 'column'}
      }}
    >
      <Image
        onClick={() => {
          history(`/series/${id}`);
        }}
        src={cover ? `${baseUrl}/${cover}` : `/static/images/no-image.png`}
        alt="Book cover"
        height="300px"
        width="200px"
        styles={{ m: 0, boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.7)' }}
      />
      <Box sx={{ ml: 1, alignSelf: 'start', width: '100%', display: 'flex', flexDirection: 'column'  }}>
        <Box>
          <Typography
            component="h3"
            variant="h6"
            color="text.primary"
          >
            {title}
          </Typography>
          {author && (
            <TypographyComponent
              title={'Авторы:'}
              data={author?.split(';')}
            />
          )}
          {!!genres?.length && (
            <TypographyComponent
              title={'Жанры:'}
              data={genres?.map((item) => item.title)}
            />
          )}
          {release_date && (
            <TypographyComponent
              title={'Дата выхода:'}
              type={'line'}
              data={moment(release_date).format('DD.MM.YYYY')}
            />
          )}
          {booksCount && <TypographyComponent type={'line'} title={'Книг в серии: '} data={booksCount} />}
          {!!tags?.length && (
            <TypographyComponent
              title={'Тэги:'}
              data={tags?.map((item) => item.title)}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mt: 2 }}>
          {user?.id.toString() === user_id.toString() && <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => {
              onDeleteSeria();
            }}
          >
            <DeleteIcon />
          </Button>}
        </Box>
        <DeleteModal
          deleteFunction={onDelete}
          deleteLabel="Книгу"
          isModalOpen={isDeleteModalOpen}
          setModalOpen={setDeleteModalOpen}
        />
      </Box>
    </ListItem>
  );
};

export default SeriaItem;
