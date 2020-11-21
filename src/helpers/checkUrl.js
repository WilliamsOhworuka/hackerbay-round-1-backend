/**
 * Checks if a url is a valid image url
 * @param {string} url
 * @return {boolean} true if url is a valid image url
 */
export default (url) => {
  const acceptedMime = ['.jpg', '.jpeg', '.png', '.gif'];
  return !!acceptedMime.find((mime) => url.endsWith(mime));
};
