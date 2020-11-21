import { applyPatch } from 'fast-json-patch';
import helpers from '../helpers';

const { error } = helpers;

/**
 * Apply json patch to json object
 * @param {object} req
 * @param {object} res
 * @returns {object} response - resulting json object
 */
export default async (req, res) => {
  const { jsonObject, patch } = req.body;

  try {
    const result = applyPatch(jsonObject, patch).newDocument;

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    error(err);

    return res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};
