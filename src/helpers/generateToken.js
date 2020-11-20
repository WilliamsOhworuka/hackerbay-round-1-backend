import jwt from 'jsonwebtoken';

/**
 * Generates a new token with payload
 * @param {object} payload
 * @returns {string} signed token
 */
export default (payload) => {
  const { JWT_SECRET } = process.env;

  return jwt.sign(payload, JWT_SECRET);
};
