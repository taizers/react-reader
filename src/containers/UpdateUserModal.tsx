import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser, UpdateUserType } from '../constants/tsSchemes';
import { usersApiSlice } from '../store/reducers/UsersApiSlice';
import { useShowErrorToast } from '../hooks';

type UpdateUserModalType = {
  user: IUser;
};

const UpdateUserModal: FC<UpdateUserModalType> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const [updateUser, { data, error, isLoading }] =
    usersApiSlice.useUpdateUserMutation();

  useShowErrorToast(error);

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
    setOldPassword('');
    setNewPassword('');
  };

  const onSubmitForm = () => {
    if ((!name || name === user.name) && (!oldPassword || !newPassword)) {
      return console.log('Empty');
    }

    console.log({ id: user.id, user: { name, oldPassword, newPassword } });
    updateUser({ id: user.id, user: { name, oldPassword, newPassword } });
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickOpen}
      >
        Редактировать профиль
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Редактирование профиля</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user.name || ''}
            onChange={(evt) => setName(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="Старый пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={(evt) => setOldPassword(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="Новый пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={(evt) => setNewPassword(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateUserModal;
