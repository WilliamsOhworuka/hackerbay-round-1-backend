import { validateSignin, checkAuthentication } from './auth.middleware';
import validateThumbnailUrl from './thumbnail.middleware';
import validateJsonPatch from './jsonPatch.middleware';

export default {
  checkAuthentication,
  validateSignin,
  validateThumbnailUrl,
  validateJsonPatch,
};
