const { BloodDietProduct } = require('../../models');

const allProducts = async (req, res) => {
  const result = await BloodDietProduct.find({});

  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = allProducts;
