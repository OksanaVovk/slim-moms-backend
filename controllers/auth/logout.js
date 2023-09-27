const { User } = require('../../models');

const logout = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.user.id },
    { token: null },
    { new: true }
  );

  res.json(204)({
    status: 'success',
  });
};

module.exports = logout;
