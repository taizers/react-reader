import React, { FC } from 'react';
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
import { SignUpUserType } from '../../constants/tsSchemes';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

type LoginTypes = {
    signUp : (data: { data: SignUpUserType; history: any }) => Promise<any>;
    isLoading: boolean;
}

const theme = createTheme();

export const SignUp: FC<LoginTypes> = ({ signUp, isLoading }) => {
    let history = useNavigate();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const secondPassword = formData.get('secondPassword')?.toString() || ''

        const data = {
            email: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
            name: formData.get('name')?.toString() || '',
        };

        if (data.email && data.password && data.name && data.password === secondPassword) {
            signUp({ data, history });
        }
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
                        {"Есть аккаунт? Войти"}
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
