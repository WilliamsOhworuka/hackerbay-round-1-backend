import { string, object } from 'yup';

/** sign in validation schema */
export const loginSchema = object({
  email: string().email('The email must be valid').required('email is requied'),
  password: string().required('password is required'),
});

/** thumbnail url validation */
export const thumbnailSchema = object({
  url: string().url('invalid url').required('url is required'),
});
