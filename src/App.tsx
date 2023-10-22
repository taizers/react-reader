import React, { useEffect, FC } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './components/Login';
import SignUp from './containers/SignUp';
import Users from './containers/Users';
import User from './containers/User';
import Books from './containers/Books';
import Book from './containers/Book';
import { getToken } from './utils/index';
import LayOut from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { authApiSlice } from './store/reducers/AuthApiSlice';
import PublicRoute from './components/PublicRoute';
import Profile from './components/Profile';
import { setUserData, setUserToken } from './store/reducers/AuthSlice';
import { useAppDispatch } from './hooks';
import NotFound from './components/NotFound';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = authApiSlice.useProfileQuery('');

  useEffect(() => {
    if (data?.id) {
      dispatch(setUserData(data));
    }
  }, [data]);

  useEffect(() => {
    const localToken = getToken();

    if (localToken) {
      dispatch(setUserToken(localToken));
    }
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<LayOut />}>
        {/* public routes */}
        <Route
          index
          element={
            <>
              <Link to={'profile'}>PROFILE</Link>
            </>
          }
        />
        <Route element={<PublicRoute />}>
          <Route path={'login'} element={<Login />} />
          <Route path={'signup'} element={<SignUp />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path={'profile'} element={<Profile />} />
          <Route path={'books'} element={<Books />} />
          <Route path={'books/:id'} element={<Book />} />
          <Route path={'users'} element={<Users />} />
          <Route path={'users/:id'} element={<User />} />
        </Route>

        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
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
