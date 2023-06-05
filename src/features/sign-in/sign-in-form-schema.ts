import * as Yup from "yup";

export default Yup.object().shape({
  email: Yup.string().email("Email doesn't valid").required("Required"),
  password: Yup.string().required("Required"),
});
