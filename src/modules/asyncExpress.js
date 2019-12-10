//Module to catch express functions inside try/catch brackets and call next() if an error occurred
const asyncExpress = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
    // next();
  } catch(e) {
    next(e)
  }
};


module.exports = asyncExpress
