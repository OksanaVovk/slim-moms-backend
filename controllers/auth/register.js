const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(404, 'Email in use');
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    password: hashPassword,
    email,
    name,
  });

  res.status(201).json({
    status: 'Created',
    code: 201,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = register;
