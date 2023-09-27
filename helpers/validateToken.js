const jwt = require('jsonwebtoken');

const validateToken = (token, Key) => {
  try {
    const userDate = jwt.verify(token, Key);
    return userDate;
  } catch (e) {
    return null;
  }
};

module.exports = validateToken;
