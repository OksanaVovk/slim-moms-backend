const { User } = require('../../models');
const { RequestError } = require('../../helpers');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { password, email, bloodType } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw RequestError(404, 'Email is wrong or verify or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  await User.findByIdAndUpdate(user._id, { token, bloodType });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        name: user.name,
      },
      bloodType,
    },
  });
};

module.exports = login;
