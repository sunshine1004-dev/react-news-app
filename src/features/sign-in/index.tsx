import { Typography, CardHeader } from '@mui/material';
import SignInForm from './sign-in-form';
import { Link, useNavigate } from 'react-router-dom';
import ResponsiveContainer from '@/components/mq/auth-form-container';
import { useDispatch } from 'react-redux';
import { signIn as signInAction } from '@/redux/authSlice';
import { SignInPayload } from './type';
import WithNotification, { ComponentProps } from '@/components/Hoc/withNotification';
import { login } from '@/common/auth';

const SignIn = (props: ComponentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = (payload: SignInPayload) => {
    dispatch(signInAction(payload))
      .unwrap()
      .then((data: any) => {
        login(data, dispatch);
        navigate('/');
      })
      .catch((err: Error) => {
        if (props.notification) {
          props.notification({
            type: 'error',
            message: err.message
          });
        }
      })
  }

  return (
    <ResponsiveContainer>
      <CardHeader
        title={
          <Typography variant='h4' align='center' gutterBottom>Welcome Back</Typography>
        }
      />
      <SignInForm handleSubmit={signUp} />
      <Typography color='gray' sx={{ marginTop: 3 }}>
        Don't you have an account? <Link to='/sign-up'>Register</Link>
      </Typography>
    </ResponsiveContainer>
  )
}

export default WithNotification(SignIn);