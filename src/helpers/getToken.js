/**
 * extracts torkn from request header
 * @param {object} req
 * @returns {string} extracted token
 */
export default (req) => {
  const bearer = req.headers.authorization.split(' ');
  return bearer[1];
};
