import { Router } from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const route = Router();

const { validateSignin } = middlewares;
const { signin } = controllers;

route.post('/signin', validateSignin, signin);

export default route;
