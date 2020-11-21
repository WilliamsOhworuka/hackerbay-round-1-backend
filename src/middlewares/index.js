import { validateSignin, checkAuthentication } from './signin.middleware';
import validateThumbnailUrl from './thumbnail.middleware';

export default {
  checkAuthentication,
  validateSignin,
  validateThumbnailUrl,
};
