const { BloodDietProduct } = require('../../models');

const bloodDietProductsUser = async (req, res, next) => {
  const bloodType = req.user.bloodType;
  const { height, age, curWeight, desWeight } = req.body;

  const dailyCalorieUser = Math.round(
    10 * curWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (curWeight - desWeight)
  );

  const result = await BloodDietProduct.find({});

  const data = result.filter(
    result => result.groupBloodNotAllowed[bloodType] === true
  );

  res.json({
    status: 'success',
    code: 200,
    data,
    dailyCalorieUser,
  });
};

module.exports = bloodDietProductsUser;
