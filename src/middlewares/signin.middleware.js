import jwt from 'jsonwebtoken';
import helpers from '../helpers';

const { getToken, loginSchema } = helpers;

/**
 * This callback type is called `next` it calls the next middleware in the stack.
 *
 * @callback requestCallback
 */

/**
 * validates sign in payload
 * @param {object} req
 * @param {object} res
 * @param {requestCallback} next
 * @returns {object} response to user
 */
export const validateSignin = async (req, res, next) => {
  const { email, password } = req.body;

  const payload = {
    email: email && email.trim(),
    password,
  };

  try {
    await loginSchema.validate(payload);
    return next();
  } catch (error) {
    return error.name === 'ValidationError'
      ? res.status(400).json({
        status: 400,
        errors: error.errors,
      })
      : res.status(500).json({
        status: 500,
        error: error.message,
      });
  }
};

/**
 * checks if user is authenticated
 * @param {object} req
 * @param {object} res
 * @param {requestCallback} next
 * @returns {object} response to user
 */
export const checkAuthentication = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json(401).json({
      status: 401,
      error: 'you are not logged in',
    });
  }

  const token = getToken(req);

  try {
    jwt.verify(token, JWT_SECRET);

    return next();
  } catch (error) {
    return req.status(401).json({
      status: 401,
      error: 'you are not logged in',
    });
  }
};
