import jimp from 'jimp';
import helpers from '../helpers';

const { error } = helpers;

/**
 * Resize thumbnails
 * @param {object} req
 * @param {object} res
 * @returns {object} response - resized thumbnail in base64
 */
export default async (req, res) => {
  const { url } = req.body;

  try {
    const originalThumbnail = await jimp.read(url);
    const resizedThumbnail = await originalThumbnail.resize(50, 50).getBase64Async(jimp.AUTO);

    return res.status(200).send(`<img src="${resizedThumbnail}" alt="thumbnail"/>`);
  } catch (err) {
    error(err);

    return res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};
