const { BloodDietProduct } = require('../../models');
const { RequestError } = require('../../helpers');

const getDiet = async (req, res, next) => {
  const { bloodType, height, age, curWeight, desWeight } = req.body;

  const dailyCalorie = Math.round(
    10 * curWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (curWeight - desWeight)
  );

  const data = await BloodDietProduct.find();

  const notRecProducts = data.filter(
    item => item.groupBloodNotAllowed[bloodType] === true
  );

  if (!notRecProducts.length) {
    throw RequestError(404, 'Not found');
  }

  res.json({
    status: 'success',
    code: 200,
    result: {
      notRecProducts,
      dailyCalorie,
    },
  });
};

module.exports = getDiet;
