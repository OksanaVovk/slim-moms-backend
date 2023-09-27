const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {
  ctrlWrapper,
  userRegisterValidation,
  userLoginValidation,
  auth,
} = require('../../middelwares');

router.post('/register', userRegisterValidation, ctrlWrapper(ctrl.register));
router.post('/login', userLoginValidation, ctrlWrapper(ctrl.login));
router.post('/logingoogle', ctrlWrapper(ctrl.logingoogle));
router.get('/refresh', ctrlWrapper(ctrl.refresh));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
// router.get('/logout', ctrlWrapper(ctrl.logout));

module.exports = router;
