import { TextField, Stack } from '@mui/material';
import { useFormik } from 'formik';
import signUpFormSchema from './sign-up-form-schema';
import { SignUpPayload } from './type';
import LoadingBtn from '@/components/loading-button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';

interface Props {
  handleSubmit: (payload: SignUpPayload) => void
}

const SignUpForm = (props: Props) => {
  const { loading } = useSelector((state: RootState) => state.auth);

  const validator = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: ''
    },
    validationSchema: signUpFormSchema,
    onSubmit: (values: SignUpPayload) => {
      props.handleSubmit(values);
    }
  })

  return (
    <form onSubmit={validator.handleSubmit}>
      <Stack direction='column' gap={3}>
        <TextField
          label='username'
          name='name'
          onChange={validator.handleChange}
          value={validator.values.name}
          error={Boolean(validator.errors.name && validator.touched.name)}
          onBlur={validator.handleBlur}
          helperText={(validator.touched.name && validator.errors.name) && validator.errors.name}
          fullWidth
        />
        <TextField
          label='email'
          name='email'
          onChange={validator.handleChange}
          onBlur={validator.handleBlur}
          error={Boolean(validator.errors.email && validator.touched.email)}
          helperText={(validator.touched.email && validator.errors.email) && validator.errors.email}
          fullWidth
        />
        <TextField
          label='password'
          name='password'
          onChange={validator.handleChange}
          onBlur={validator.handleBlur}
          error={Boolean(validator.errors.password && validator.touched.password)}
          helperText={(validator.touched.password && validator.errors.password) && validator.errors.password}
          type='password'
          fullWidth
        />
        <TextField
          label='confirm password'
          name='confirm'
          onChange={validator.handleChange}
          onBlur={validator.handleBlur}
          error={Boolean(validator.errors.confirm && validator.touched.confirm)}
          helperText={(validator.touched.confirm && validator.errors.confirm) && validator.errors.confirm}
          type='password'
          fullWidth
        />
        <LoadingBtn loading={loading} color='error' type='submit' variant='contained' size='large' fullWidth>Sign Up</LoadingBtn>
      </Stack>
    </form>
  )
}

export default SignUpForm;
