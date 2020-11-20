import genrateToken from '../helpers/generateToken';

/**
 * Sign in controller
 * @param {object} req
 * @param {object} res
 * @returns {object} response to user
 */
export default (req, res) => {
  const { email } = req.body;
  const token = genrateToken({ email });

  return res.status(200).json({
    status: 200,
    token,
  });
};
