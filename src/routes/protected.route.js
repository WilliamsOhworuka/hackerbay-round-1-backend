import { Router } from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const route = Router();

const { checkAuthentication, validateThumbnailUrl, validateJsonPatch } = middlewares;
const { thumbnailController, jsonPatchController } = controllers;

route
  .post('/resize-thumbnail', checkAuthentication, validateThumbnailUrl, thumbnailController)
  .post('/patch-json', checkAuthentication, validateJsonPatch, jsonPatchController);

export default route;
