const validateToken = require('../helpers/validateToken');
const { User } = require('../models/user');
const { RequestError } = require('../helpers');
// const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw RequestError(401, 'Unauthorized');
    }
    const { authorization = '' } = req.headers;
    const [bearer = '', token = ''] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw RequestError(401, 'Invalid token');
    }
    if (!token) {
      throw RequestError(401, 'Unauthorized');
    }

    const userData = validateToken(token, SECRET_KEY);
    if (!userData) {
      throw RequestError(401, 'Unauthorized');
    }

    const { id } = userData;
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw RequestError(404, 'Not found');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
