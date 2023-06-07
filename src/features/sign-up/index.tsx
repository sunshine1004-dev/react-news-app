import { useDispatch } from 'react-redux';
import { Typography, CardHeader } from '@mui/material';
import SignUpForm from './sign-up-form';
import { Link, useNavigate } from 'react-router-dom';
import ResponsiveContainer from '@/components/mq/auth-form-container';
import { signUp as signUpAction } from '@/redux/auth-slice';
import { SignUpPayload } from './type';
import WithNotification, { ComponentProps } from '@/components/Hoc/withNotification';


const SignUp = (props: ComponentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = (payload: SignUpPayload) => {
    dispatch(signUpAction(payload))
      .unwrap()
      .then(() => {
        navigate('/sign-in');
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
          <Typography variant='h4' align='center' gutterBottom>Register</Typography>
        }
      />
      <SignUpForm handleSubmit={signUp} />
      <Typography color='gray' sx={{ marginTop: 3 }}>
        Do you already have an account? <Link to='/sign-in'>Sign In</Link>
      </Typography>
    </ResponsiveContainer>
  )
}

export default WithNotification(SignUp);