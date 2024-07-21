import React, { FC, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { authApiSlice } from '../store/reducers/AuthApiSlice';
import { useShowErrorToast } from '../hooks';
import { createToast } from '../utils/toasts';
import Loader from '../components/Loader';

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        React Reader
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const theme = createTheme();

const SignUp: FC = () => {
  let history = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [signUp, { data, error, isLoading }] = authApiSlice.useSignUpMutation();

  useShowErrorToast(error);

  useEffect(() => {
    if (!!data) {
      history('/login');
    }
  }, [data]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && name && password && repeatPassword) {
      if (password === repeatPassword) {
        return signUp({ email, name, password, repeatPassword });
      }
      return createToast.error('Пароли не идентичны');
    }

    createToast.error('Заполните все данные');
  };

  return (
    <ThemeProvider theme={theme}>
      <ArrowBackIcon
        fontSize="large"
        sx={{ ml: 10, mt: -2, position: 'absolute' }}
        onClick={() => history('/')}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Имя"
              name="name"
              autoComplete="text"
              onChange={(evt) => setName(evt.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Почтовый адрес"
              name="email"
              autoComplete="email"
              onChange={(evt) => setEmail(evt.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              onChange={(evt) => setPassword(evt.target.value)}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="secondPassword"
              label="Павторите пароль"
              type="password"
              id="secondPassword"
              onChange={(evt) => setRepeatPassword(evt.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Есть аккаунт? Войти'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        {!!isLoading && <Loader />}
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
