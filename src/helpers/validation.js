import * as Yup from 'yup';

/** sign in validation schema */
export default Yup.object({
  email: Yup.string().email('The email must be valid').required('This field can not be empty'),
  password: Yup.string().required('This field can not be empty'),
});
