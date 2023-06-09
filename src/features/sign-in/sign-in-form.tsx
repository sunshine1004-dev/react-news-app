import { TextField, Stack } from '@mui/material';
import { useFormik } from 'formik';
import signInFormSchema from './sign-in-form-schema';
import LoadingBtn from '@/components/loading-button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { SignInPayload } from './type';

interface Props {
  handleSubmit: (payload: SignInPayload) => void
}

const SignInForm = (props: Props) => {
  const { loading } = useSelector((state: RootState) => state.auth);

  const validator = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInFormSchema,
    onSubmit: (values: SignInPayload) => {
      props.handleSubmit(values);
    }
  })

  return (
    <form onSubmit={validator.handleSubmit}>
      <Stack direction='column' gap={3}>
        <TextField
          label='email'
          name='email'
          onChange={validator.handleChange}
          value={validator.values.email}
          onBlur={validator.handleBlur}
          error={Boolean(validator.errors.email && validator.touched.email)}
          helperText={(validator.errors.email && validator.touched.email) && validator.errors.email}
          fullWidth
        />
        <TextField
          label='password'
          type='password'
          name='password'
          onChange={validator.handleChange}
          onBlur={validator.handleBlur}
          value={validator.values.password}
          error={Boolean(validator.errors.password && validator.touched.password)}
          helperText={(validator.errors.password && validator.touched.password) && validator.errors.password}
          fullWidth
        />
        <LoadingBtn loading={loading} color='error' type='submit' variant='contained' size='large' fullWidth>Sign In</LoadingBtn>
      </Stack>
    </form>
  )
}

export default SignInForm;
