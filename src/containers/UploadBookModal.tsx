import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs, { Dayjs } from 'dayjs';
import { useShowErrorToast } from '../hooks';
import { ExtendedFileProps } from 'react-mui-fileuploader/dist/types/index.types';
import UploadFile from '../components/UploadFile';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import TextFieldComponent from '../components/TextFieldComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import AutoCompleteComponent from '../components/AutoCompleteComponent';
import { genresApiSlice } from '../store/reducers/GenresApiSlice';
import { tagsApiSlice } from '../store/reducers/TagsApiSlice';

type UploadBookModalType = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const UploadBookModal: FC<UploadBookModalType> = ({
  isModalOpen,
  setModalOpen,
}) => {
  const [name, setName] = useState<string>('');
  const [annotation, setAnnotation] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [release_date, setReleaseDate] = useState<Date | null | Dayjs>(
    dayjs(Date.now())
  );
  const [source, setSource] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<string>();
  const [book, setBook] = useState<ExtendedFileProps | null>(null);
  const [genres, setGenres] = useState<Array<{
    id: number;
    title: string;
  }> | null>(null);
  const [tags, setTags] = useState<Array<{ id: number; title: string }> | null>(
    null
  );

  const [createBook, { data, error, isLoading }] =
    booksApiSlice.useCreateBookMutation();
  const {
    data: genresData,
    error: genresError,
    isLoading: genresIsLoading,
  } = genresApiSlice.useGetGenresByQueryQuery('');
  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsIsLoading,
  } = tagsApiSlice.useGetTagsByQueryQuery('');

  useShowErrorToast(error);
  useShowErrorToast(fieldsError);
  useShowErrorToast(genresError);
  useShowErrorToast(tagsError);

  useEffect(() => {
    if (!!data) {
      setModalOpen(false);
    }
  }, [data]);

  useEffect(() => {
    if (!!fieldsError) {
      setFieldsError(undefined);
    }
  }, [fieldsError]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmitForm = () => {
    if (!name && !genres && !book) {
      return setFieldsError('Some fields are Empty');
    }

    const formData = new FormData();

    if (genres) {
      const gnrs = genres.map((item) => item.id).join(';');
      formData.append('genres', gnrs);
    }

    if (tags) {
      const tgs = tags.map((item) => item.id).join(';');
      formData.append('tags', tgs);
    }

    formData.append('title', name);
    formData.append('annotation', annotation);
    formData.append('author', author);
    release_date && formData.append('release_date', release_date.toString());
    formData.append('source', source);
    book && formData.append('book', book);

    createBook(formData);
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>Загрузить книгу</DialogTitle>
        <TextFieldComponent
          id={'name'}
          label={'Имя'}
          onChangeFunction={setName}
        />
        <TextFieldComponent
          id={'annotation'}
          label={'Аннотация'}
          onChangeFunction={setAnnotation}
        />
        <TextFieldComponent
          id={'author'}
          label={'Автор'}
          onChangeFunction={setAuthor}
        />
        <DatePickerComponent
          label={'Дата выпуска'}
          setValue={setReleaseDate}
          value={release_date}
        />
        <TextFieldComponent
          id={'source'}
          label={'Ресурс'}
          onChangeFunction={setSource}
        />
        {genresData && (
          <AutoCompleteComponent
            options={genresData}
            label={'Жанры'}
            placeholder={'Искать'}
            setValues={setGenres}
          />
        )}
        {tagsData && (
          <AutoCompleteComponent
            options={tagsData}
            label={'Тэги'}
            placeholder={'Искать'}
            setValues={setTags}
          />
        )}
        <UploadFile setFiles={setBook} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={onSubmitForm}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadBookModal;
