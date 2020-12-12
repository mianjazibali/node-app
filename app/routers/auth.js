const { Router } = require('express');
const router = Router();

const AuthController = require('./../controllers/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
