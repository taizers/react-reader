import React, { useEffect, FC } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import User from './pages/User';
import Books from './pages/Books';
import Book from './pages/Book';
import { getToken } from './utils/index';
import LayOut from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { authApiSlice } from './store/reducers/AuthApiSlice';
import PublicRoute from './components/PublicRoute';
import Profile from './pages/Profile';
import { setUserData, setUserToken } from './store/reducers/AuthSlice';
import { useAppDispatch } from './hooks';
import NotFound from './pages/NotFound';
import LocalBooks from './pages/LocalBooks';
import ReadBook from './pages/ReadBook';
import Library from './pages/Library';
import LibraryBookStatusComponent from './components/LibraryBookStatusComponent';
import Loader from './components/Loader';
import BookSkeleton from './skeletons/BookSkeleton';
import Series from './pages/Series';
import Seria from './pages/Seria';
import LocalBook from './pages/LocalBook';

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
