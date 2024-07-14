import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type DeleteModalType = {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  deleteFunction: () => void;
  deleteLabel: string;
};

const DeleteModal: FC<DeleteModalType> = ({ isModalOpen, setModalOpen, deleteFunction, deleteLabel }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmitForm = () => {
    deleteFunction();
  };

  return (
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>{`Вы действительно хотите удалить ${deleteLabel}?`}</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Удалить</Button>
        </DialogActions>
      </Dialog>
  );
};

export default DeleteModal;
