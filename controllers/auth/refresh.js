const { User } = require('../../models');
// const { RequestError } = require('../../helpers');
const validateToken = require('../../helpers/validateToken');
const jwt = require('jsonwebtoken');

const { SECRET_KEY_REFRESH, SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  // const { refreshToken } = req.body;
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: 'Refreshtoken not found',
        },
      ],
    });
  }
  try {
    const user = validateToken(refreshToken, SECRET_KEY_REFRESH);
    const { id } = user;
    const token = await jwt.sign({ id }, SECRET_KEY, { expiresIn: 300 });
    await User.findByIdAndUpdate({ _id: id }, { token });
    res.status(200).json({ token });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: 'Invalid token',
        },
      ],
    });
  }
};

module.exports = refresh;
