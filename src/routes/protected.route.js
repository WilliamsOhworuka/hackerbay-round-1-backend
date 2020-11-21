import { Router } from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const route = Router();

const { checkAuthentication, validateThumbnailUrl } = middlewares;
const { thumbnailController } = controllers;

route.post('/resize', validateThumbnailUrl, checkAuthentication, thumbnailController);

export default route;
