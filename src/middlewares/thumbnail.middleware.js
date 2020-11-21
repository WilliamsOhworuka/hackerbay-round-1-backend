import helpers from '../helpers';

const { thumbnailSchema, error, checkMime } = helpers;

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
export default async (req, res, next) => {
  const { url } = req.body;

  try {
    await thumbnailSchema.validate({ url: url && url.trim() });

    const isValidMime = checkMime(url);

    if (!isValidMime) {
      return res.status(400).json({
        status: 400,
        errors: ['invalid url'],
      });
    }

    return next();
  } catch (err) {
    error(err);
    return res.status(400).json({
      status: 400,
      errors: err.errors,
    });
  }
};
