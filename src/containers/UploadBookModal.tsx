import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from 'dayjs';
import { useShowErrorToast } from '../hooks';
import { ExtendedFileProps } from 'react-mui-fileuploader/dist/types/index.types';
import UploadFile from '../components/UploadFile';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import TextFieldComponent from '../components/TextFieldComponent';
import DatePickerComponent from '../components/DatePickerComponent';

type UploadBookModalType = {
  // user: UserType;
};

const UploadBookModal: FC<UploadBookModalType> = ({ }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [annotation, setAnnotation] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [release_date, setReleaseDate] = useState<Date | null | Dayjs>(dayjs(Date.now()));
  const [source, setSource] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<string>();
  const [book, setBook] = useState<ExtendedFileProps>();

  const [createBook, { data, error, isLoading }] =
    booksApiSlice.useCreateBookMutation();

  useShowErrorToast(error);
  useShowErrorToast(fieldsError);

  useEffect(() => {
    if (!!data) {
      setOpen(false);
    }
  }, [data]);
  useEffect(() => {
    if (!!fieldsError) {
      setFieldsError(undefined);
    }
  }, [fieldsError]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setGenres('');
  };

  const onSubmitForm = () => {
    if (!name && !genres && !book) {
      return setFieldsError('Some fields are Empty');
    }
    const formData = new FormData();
    formData.append('title', name);
    formData.append('categories', genres);
    formData.append('annotation', annotation);
    formData.append('author', author);
    release_date && formData.append('release_date', release_date.toString());
    formData.append('source', source);
    book && formData.append('book', book);

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
          <TextFieldComponent id={'name'} label={'Имя'} onChangeFunction={setName} />
          <TextFieldComponent id={'genres'} label={'Жанры'} onChangeFunction={setGenres} />
          <TextFieldComponent id={'annotation'} label={'Аннотация'} onChangeFunction={setAnnotation} />
          <TextFieldComponent id={'author'} label={'Автор'} onChangeFunction={setAuthor} />
          <DatePickerComponent label={'Дата выпуска'} setValue={setReleaseDate} value={release_date} />
          <TextFieldComponent id={'source'} label={'Ресурс'} onChangeFunction={setSource} />
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
