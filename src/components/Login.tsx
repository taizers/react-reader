import React, { FC, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { LoginUserType } from '../constants/tsSchemes';
import { authApiSlice } from '../store/reducers/AuthApiSlice';
import { useAppDispatch } from '../hooks';
import { setUserData, setUserToken } from '../store/reducers/AuthSlice';
import { setToken } from '../utils';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login: FC = () => {
    let history = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login, {data, error, isLoading}] = authApiSlice.useLoginMutation();

    useEffect(() => {
        if (data?.user?.id) {
            const token = data.user_session?.access_token;

            dispatch(setUserData(data.user));
            dispatch(setUserToken(token));
            setToken(token);
        }
    }, [data]);  

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log(email,password);
        if (email && password) {
            return login({ email,password });
        }
        alert('login error');
    };

    return (
        <ThemeProvider theme={theme}>
        <ArrowBackIcon fontSize='large' sx={{ ml: 10, mt: -2, position: "absolute" }} onClick={() => history('/')}/>
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
                Вход
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Запомнить меня"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Войти
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="/forgotPassword" variant="body2">
                    Забыли пароль?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/signUp" variant="body2">
                    {"Нет аккаунта? Зарегистрироваться"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
}

export default Login;
