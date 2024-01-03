const { User } = require('../../models');
const { RequestError } = require('../../helpers');
const jwt = require('jsonwebtoken');

const { SECRET_KEY, SECRET_KEY_REFRESH } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw RequestError(404, 'Email is wrong or verify or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, {
    expiresIn: '30d',
  });

  await User.findByIdAndUpdate(user._id, { token, refreshToken });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 100,
    httpOnly: true,
  });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      refreshToken,
      user: {
        email,
        name: user.name,
        bloodType: user.bloodType,
        height: user.height,
        age: user.age,
        curWeight: user.curWeight,
        desWeight: user.desWeight,
        dailyCalorie: user.dailyCalorie,
        notRecProducts: user.notRecProducts,
      },
    },
  });
};

module.exports = login;
