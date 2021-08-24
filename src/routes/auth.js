const express = require('express');
const { signup, signin } = require('../controllers/auth');

const { validateSignUpRequest, isRequestValidate, validateSignInRequest } = require('../validators/auth');
const router = express.Router();

router.post('/signin', validateSignInRequest, isRequestValidate, signin);

router.post('/signup', validateSignUpRequest, isRequestValidate, signup);

module.exports = router;