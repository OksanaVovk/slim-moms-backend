const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/dailyProducts');
const { ctrlWrapper, validation, auth } = require('../../middelwares');
const { joiSchema } = require('../../models/dailyProduct');

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.addOne));
router.get('/', auth, ctrlWrapper(ctrl.getByDate));
router.delete('/:productId', auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
