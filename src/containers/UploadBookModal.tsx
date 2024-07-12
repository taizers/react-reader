import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useShowErrorToast } from '../hooks';
import { ExtendedFileProps } from 'react-mui-fileuploader/dist/types/index.types';
import UploadFile from '../components/UploadFile';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';

type UploadBookModalType = {
  // user: UserType;
};

const UploadBookModal: FC<UploadBookModalType> = ({ }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<string>('');
  const [book, setBook] = useState<ExtendedFileProps[]>();

  const [createBook, { data, error, isLoading }] =
    booksApiSlice.useCreateBookMutation();

  useShowErrorToast(error);
  useShowErrorToast(fieldsError);

  useEffect(() => {
    if (!!data) {
      setOpen(false);
    }
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setGenres('');
  };

  const onSubmitForm = () => {
    if ((!name) && !genres) {
      return setFieldsError('some fields Empty');
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('genres', genres);
    book?.forEach((item) => {
      formData.append('books', item);
    })

    createBook(formData);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={handleClickOpen}
      >
        <CloudUploadIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Загрузить книгу</DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            onChange={(evt) => setName(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="genres"
            label="Жанры"
            type="text"
            fullWidth
            variant="standard"
            onChange={(evt) => setGenres(evt.target.value)}
          />
          <UploadFile setFiles={setBook} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadBookModal;
