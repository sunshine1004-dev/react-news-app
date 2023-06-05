import React, { useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/features/app';
import SignIn from '@/features/sign-in';
import SignUp from '@/features/sign-up';
import Dashboard from '@/features/dashboard';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '@/common/auth';
import { User } from '@/redux/type';

type Props = {
  children: React.ReactNode
}

const LoggedIn = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser: User = JSON.parse(user);
      if (parsedUser.exp * 1000 < Date.now()) {
        
      }

      setUserInfo(dispatch);
    } else {
      navigate('/sign-in');
    }
  }, []);

  return (
    <>
      {props.children}
    </>
  )
}

const Auth = (props: Props) => {
  const navigate = useNavigate();

  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>{props.children}</>
  )
}

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/sign-in',
        element: <Auth><SignIn /></Auth>
      },
      {
        path: '/sign-up',
        element: <Auth><SignUp /></Auth>
      },
      {
        path: '/',
        element: <LoggedIn><Dashboard /></LoggedIn>
      }
    ]
  }
]);
