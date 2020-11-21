import { Router } from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const route = Router();

const { validateSignin } = middlewares;
const { signinController } = controllers;

route.post('/signin', validateSignin, signinController);

export default route;
