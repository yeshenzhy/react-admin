
const env = process.env.NODE_ENV;
// eslint-disable-next-line import/no-dynamic-require
export default require(`./${env}.env`);
