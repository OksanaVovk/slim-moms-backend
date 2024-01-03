const { User } = require('../../models');

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { refreshToken: null }
  );
  res.clearCookie('refreshToken');
  // await User.findByIdAndUpdate(
  //   { _id: req.user.id },
  //   { token: null },
  //   { new: true }
  // );

  res.json({
    code: 204,
    status: 'success',
  });
};

module.exports = logout;
