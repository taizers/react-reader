import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserType, UpdateUserType } from '../../constants/tsSchemes';

type UpdateUserModalType = {
    user: UserType;
    updateUser: (data: UpdateUserType) => Promise<any>;
}

export const UpdateUserModal: FC<UpdateUserModalType> = ({ user, updateUser }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setName('');
      setOldPassword('');
      setNewPassword('');
    };

    const onChangeName = (e: any) => {
        setName(e.target.value);
    };

    const onChangeOldPassword = (e: any) => {
        setOldPassword(e.target.value);
    };

    const onChangeNewPAssword = (e: any) => {
        setNewPassword(e.target.value);
    };

    const onSubmitForm = () => {
        const data: UpdateUserType = { id: user.id};

        if ((!name || name === user.name) && (!oldPassword || !newPassword)) {
            return console.log('Empty');
        }

        if (oldPassword && newPassword) {
          data.oldPassword = oldPassword;
          data.newPassword = newPassword;
        }

        if (name) {
          data.name = name;
        }

        console.log(data);
        updateUser(data);
    }
  
    return (
      <div>
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
            <DialogContentText>
              Редактирование профиля
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Имя"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={user.name || ''}
              onChange={onChangeName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="oldPassword"
              label="Старый пароль"
              type="password"
              fullWidth
              variant="standard"
              onChange={onChangeOldPassword}
            />
            <TextField
              autoFocus
              margin="dense"
              id="newPassword"
              label="Новый пароль"
              type="password"
              fullWidth
              variant="standard"
              onChange={onChangeNewPAssword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={onSubmitForm}>Сохранить</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}