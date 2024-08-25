import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UpdateUserModal from '../containers/UpdateUserModal';
import { authApiSlice } from '../store/reducers/AuthApiSlice';
import { useShowErrorToast } from '../hooks';

const Profile: FC = () => {
  const { data, error } = authApiSlice.useProfileQuery('');
  
  useShowErrorToast(error);

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
            ID: {data?.id}
          </Typography>
          <Typography component="h3" variant="h5">
            Почта: {data?.email}
          </Typography>
          {data?.role && <Typography component="h3" variant="h5">
            Роль: {data?.role}
          </Typography>}
          <Typography component="h3" variant="h5">
            Имя: {data?.name}
          </Typography>
          <Typography component="h3" variant="h5">
            Удалён: {data?.deleted_at ? 'Да' : 'Нет'}
          </Typography>
          {data && <UpdateUserModal user={data} />}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
