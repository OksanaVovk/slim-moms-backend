const getCurrent = async (req, res) => {
  const {
    name,
    _id,
    bloodType,
    height,
    age,
    curWeight,
    desWeight,
    dailyCalorie,
    notRecProducts,
  } = req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        id: _id,
        name,
        bloodType,
        height,
        age,
        curWeight,
        desWeight,
        dailyCalorie,
        notRecProducts,
      },
    },
  });
};

module.exports = getCurrent;
