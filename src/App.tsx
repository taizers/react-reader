import React, { useEffect, FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Main from './containers/Main/index';
import Login from './containers/Login/index';
import SignUp from './containers/SignUp/index';
import { PublicRoute, PrivateRoute } from './router/components/index';
import { getToken } from './utils/index';
import { checkAuth } from './actions/auth';
import { StyledApp } from './styled';

type AppType = {
  checkAuth: (history: any) => Promise<any>;
};

const App: FC<AppType> = ({ checkAuth }) => {
  const history = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (token) {
      checkAuth(history);
    }
  }, []);

  return (
    <StyledApp>
      <Routes>
        <Route path='/login' element={<PublicRoute component={<Login />}/>} />
        <Route path='/signUp' element={<PublicRoute component={<SignUp />}/>} />
        <Route path='/users' element={<PrivateRoute component={<Users />}/>} />
        <Route path='/users/:id' element={<PrivateRoute component={<SingleUser />}/>} />
        <Route path='/profile' element={<PrivateRoute component={<Profile />}/>} />
        <Route path='/books' element={<PrivateRoute component={<Books />}/>} />
        <Route path='/books/:id' element={<PrivateRoute component={<Book />}/>} />
        <Route path="/login" element={<PublicRoute component={<Login />} />} />
        <Route
          path="/sign-up"
          element={<PublicRoute component={<SignUp />} />}
        />
        <Route path="/*" element={<Main />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledApp>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  checkAuth: (history: any) => dispatch(checkAuth(history)),
});

export default connect(null, mapDispatchToProps)(App);
