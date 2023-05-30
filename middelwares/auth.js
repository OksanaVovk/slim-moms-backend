const { User } = require('../models/user');
const { RequestError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer = '', token = ''] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw RequestError(401, 'Invalid token');
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id);

      if (!user) {
        throw RequestError(404, 'Not found user');
      }

      req.user = user;

      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
