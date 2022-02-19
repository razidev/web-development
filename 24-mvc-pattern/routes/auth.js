const express = require('express');
const authControllers = require('../controllers/auth-controllers');

const router = express.Router();

router.get('/signup', authControllers.signup);

router.get('/login', authControllers.login);

router.post('/signup', authControllers.signupForm);

router.post('/login', authControllers.loginForm);

router.post('/logout', authControllers.logout);

router.get('/401', authControllers.get401Page);

module.exports = router;
