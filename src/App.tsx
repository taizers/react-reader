import React, { useEffect, FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import User from './pages/User';
import Books from './pages/Books';
import Book from './pages/Book';
import { getToken, getUserFromToken } from './utils/index';
import LayOut from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { authApiSlice } from './store/reducers/AuthApiSlice';
import PublicRoute from './components/PublicRoute';
import Profile from './pages/Profile';
import { setUserData } from './store/reducers/AuthSlice';
import { useAppDispatch } from './hooks';
import NotFound from './pages/NotFound';
import LocalBooks from './pages/LocalBooks';
import ReadBook from './pages/ReadBook';
import Library from './pages/Library';
import BookSkeleton from './skeletons/BookSkeleton';
import Series from './pages/Series';
import Seria from './pages/Seria';
import LocalBook from './pages/LocalBook';

const App: FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const localToken = getToken();

    if (localToken) {
      const user = getUserFromToken(localToken);
      dispatch(setUserData(user));
    } else {
      dispatch(setUserData({}));
    }
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<LayOut />}>
        {/* public routes */}
        <Route
          index
          element={<><BookSkeleton /></>}
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
          <Route path={'/local-books'} element={<LocalBooks />} />
          <Route path={'/local-books/:id'} element={<LocalBook />} />
          <Route path={'/local-books/:id/read'} element={<ReadBook />} />
          <Route path={'/library'} element={<Library />} />
          <Route path={'users'} element={<Users />} />
          <Route path={'users/:id'} element={<User />} />
          <Route path={'series'} element={<Series />} />
          <Route path={'series/:id'} element={<Seria />} />
        </Route>

        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
