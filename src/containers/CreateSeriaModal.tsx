import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs, { Dayjs } from 'dayjs';
import { useShowErrorToast } from '../hooks';
import UploadFile from '../components/UploadFile';
import { booksApiSlice } from '../store/reducers/BooksApiSlice';
import TextFieldComponent from '../components/TextFieldComponent';
import DatePickerComponent from '../components/DatePickerComponent';
import AutoCompleteComponent from '../components/AutoCompleteComponent';
import { genresApiSlice } from '../store/reducers/GenresApiSlice';
import { tagsApiSlice } from '../store/reducers/TagsApiSlice';
import { seriesApiSlice } from '../store/reducers/SeriesApiSlice';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { ExtendedFileProps } from 'react-mui-fileuploader/dist/types/index.types';

type CreateSeriaModalType = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const CreateSeriaModal: FC<CreateSeriaModalType> = ({
  isModalOpen,
  setModalOpen,
}) => {
  const [name, setName] = useState<string>('');
  const [annotation, setAnnotation] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [release_date, setReleaseDate] = useState<Date | null | Dayjs>(
    dayjs(Date.now())
  );
  const [fieldsError, setFieldsError] = useState<string>();
  const [cover, setCover] = useState<ExtendedFileProps | null>(null);
  const [genres, setGenres] = useState<Array<{
    id: number;
    title: string;
  }> | null>(null);
  const [tags, setTags] = useState<Array<{ id: number; title: string }> | null>(
    null
  );

  const [createSeria, { data, error, isLoading }] =
    seriesApiSlice.useCreateSeriaMutation();

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
    if (!name) {
      return setFieldsError('Поле Название не заполнено');
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
    cover && formData.append('cover', cover);

    createSeria(formData);
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>{'Создать Серию'}</DialogTitle>
        <TextFieldComponent
          id={'name'}
          label={'Название'}
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
        <UploadFile setFiles={setCover} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={onSubmitForm}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSeriaModal;
