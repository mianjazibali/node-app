const { Router } = require('express');
const router = Router();

const authController = require('./../controllers/auth');
const { verifyRefreshToken } = require('../../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post(
	'/refresh-token',
	verifyRefreshToken,
	authController.getSignedTokens
);

module.exports = router;
