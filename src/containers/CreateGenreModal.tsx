import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useShowErrorToast } from '../hooks';
import TextFieldComponent from '../components/TextFieldComponent';
import { genresApiSlice } from '../store/reducers/GenresApiSlice';

type CreateGenreModalModalType = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const CreateGenreModal: FC<CreateGenreModalModalType> = ({
  isModalOpen,
  setModalOpen,
}) => {
  const [genre, setGenre] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<string>();

  const [createGenre, { data, error, isLoading }] =
    genresApiSlice.useCreateGenreMutation();

  const {
    data: genresData,
    error: genresError,
    isLoading: genresIsLoading,
  } = genresApiSlice.useGetGenresByQueryQuery('');

  useShowErrorToast(error);
  useShowErrorToast(fieldsError);

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
    if (!genre) {
      return setFieldsError('Не введено имя тэга');
    }

    const equal = genresData.find(
      (item: { title: string }) => item.title === genre
    );

    if (equal) {
      return setFieldsError('Такой тэг уже существует');
    }

    createGenre({ title: genre });
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogContent>
        <DialogTitle>{'Добавить жанр'}</DialogTitle>
        <TextFieldComponent
          id={'genre'}
          label={'Жанр'}
          onChangeFunction={setGenre}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={onSubmitForm}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGenreModal;
