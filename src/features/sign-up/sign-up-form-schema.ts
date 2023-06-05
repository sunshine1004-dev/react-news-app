import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("Required!"),
  email: Yup.string().email('Email is not valid').required('Required!'),
  password: Yup.string().required("Required!"),
  confirm: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match").required('Required!')
});
