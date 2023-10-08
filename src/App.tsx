import React, { useEffect, FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Main from './containers/Main/index';
import NotFound from './components/NotFound/index';
import Login from './containers/Login/index';
import SignUp from './containers/SignUp/index';
import Users from './containers/Users/index';
import SingleUser from './containers/SingleUser/index';
import Profile from './containers/Profile/index';
import Books from './containers/Books/index';
import Book from './containers/Book/index';
import { PublicRoute, PrivateRoute } from './router/components/index';
import { getToken } from './utils/index';
import { checkAuth } from './actions/auth';
import { StyledApp } from './styled';
import { authApi } from './services/AuthService';

const App: FC = () => {
  const history = useNavigate();

  const [checkAuth, {data, error, isLoading}] = authApi.useCheckAuthMutation();

  useEffect(() => {
    const token = getToken();

    if (token) {
      checkAuth('');
    }
  }, []);

  useEffect(() => {
    if (error) {
      history('/login');
    }
    console.log('++++++');
  }, [error]);

  return (
    <>
    </>
    // <StyledApp>
    //   <Routes>
    //     <Route path='/login' element={<PublicRoute component={<Login />}/>} />
    //     <Route path='/signUp' element={<PublicRoute component={<SignUp />}/>} />
    //     <Route path='/users' element={<PrivateRoute component={<Users />}/>} />
    //     <Route path='/users/:id' element={<PrivateRoute component={<SingleUser />}/>} />
    //     <Route path='/profile' element={<PrivateRoute component={<Profile />}/>} />
    //     <Route path='/books' element={<PrivateRoute component={<Books />}/>} />
    //     <Route path='/books/:id' element={<PrivateRoute component={<Book />}/>} />
    //     <Route path="/*" element={<PrivateRoute component={<Main />}/>} />
    //   </Routes>
    //   <Toaster position="bottom-right" reverseOrder={false} />
    // </StyledApp>
  );
};

export default App;
