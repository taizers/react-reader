import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UpdateUserModal from '../containers/UpdateUserModal';
import { useAppSelector } from '../hooks';

const Profile: FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Личный кабинет
        </Typography>
        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {user?.id}
          </Typography>
          <Typography component="h3" variant="h5">
            Почта: {user?.email}
          </Typography>
          <Typography component="h3" variant="h5">
            Имя: {user?.name}
          </Typography>
          <Typography component="h3" variant="h5">
            Удалён: {user?.deleted_at ? 'Да' : 'Нет'}
          </Typography>
          {user && <UpdateUserModal user={user} />}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
