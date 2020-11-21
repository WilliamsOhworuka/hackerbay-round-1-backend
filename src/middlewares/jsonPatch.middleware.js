import { validate } from 'fast-json-patch';
/**
 * This callback type is called `next` it calls the next middleware in the stack.
 *
 * @callback requestCallback
 */

/**
 * validates json patch array and json object
 * @param {object} req
 * @param {object} res
 * @param {requestCallback} next
 * @returns {object} response to user
 */
export default async (req, res, next) => {
  const { jsonObject, patch } = req.body;

  if (!patch) {
    return res.status(400).json({
      status: 400,
      errors: ['patch is required'],
    });
  }

  if (!jsonObject) {
    return res.status(400).json({
      status: 400,
      errors: ['jsonObject is required'],
    });
  }

  const validJsonObject = typeof jsonObject === 'object' && !Array.isArray(jsonObject);

  if (!validJsonObject) {
    return res.status(400).json({
      status: 400,
      errors: ['invalid jsonObject'],
    });
  }

  const error = validate(patch, jsonObject);

  if (error) {
    const message = `Invalid patch - error: ${error.message.split('\n')[0]}`;

    return res.status(400).send({
      status: 400,
      errors: [message],
    });
  }

  return next();
};
