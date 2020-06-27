const jwt = require('jsonwebtoken');
const db = require('../data/db');

module.exports = {
  createError: (req, res, next) => {
    const error = new Error('page not found');

    res.status(404);
    next(error);
  },
  // eslint-disable-next-line no-unused-vars
  notFound: (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).send({
      message: error.message,
      stack: error.stack,
    });
  },
  auth: async (req, res, next) => {
    let token;
    let decoded;

    try {
      token = req.header('Authorization').replace('Bearer ', '');

      decoded = jwt.verify(token, process.env.SALT);
    } catch (error) {
      res.status(404).send('please sign in');
    }

    // eslint-disable-next-line no-underscore-dangle
    const user = await db('user').where({ email: decoded._id, token });

    if (!user) {
      throw new Error('you cannot view the data');
    }

    // eslint-disable-next-line prefer-destructuring
    req.user = user[0];
    req.token = token;

    next();
  },
  asyncErrorHandler: (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  },
};
