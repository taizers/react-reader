import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useShowErrorToast } from '../hooks';
import TextFieldComponent from '../components/TextFieldComponent';
import { tagsApiSlice } from '../store/reducers/TagsApiSlice';

type CreateTagModalModalType = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const CreateTagModal: FC<CreateTagModalModalType> = ({ isModalOpen, setModalOpen }) => {
  const [tag, setTag] = useState<string>('');
  const [fieldsError, setFieldsError] = useState<string>();

  const [createTag, { data, error, isLoading }] =
    tagsApiSlice.useCreateTagMutation();
  
  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsIsLoading,
  } = tagsApiSlice.useGetTagsByQueryQuery('');

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
    if (!tag) {
      return setFieldsError('Не введено имя тэга');
    };

    const equal = tagsData.find((item: { title: string }) => item.title === tag);

    if (equal) {
      return setFieldsError('Такой тэг уже существует');
    };

    createTag({title: tag});
  };

  return (
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>{'Добавить тэг'}</DialogTitle>
          <TextFieldComponent id={'tag'} label={'Тэг'} onChangeFunction={setTag} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreateTagModal;
