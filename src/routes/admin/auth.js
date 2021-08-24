const express = require('express');
const { requireSignin } = require('../../common-middleware');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { validateSignUpRequest, validateSignInRequest, isRequestValidate } = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signin', validateSignInRequest, isRequestValidate, signin);

router.post('/admin/signup', validateSignUpRequest, isRequestValidate, signup);
router.post('/admin/signout', requireSignin, signout);
module.exports = router;