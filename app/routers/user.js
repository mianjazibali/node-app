const { Router } = require('express');
const router = Router();

const userController = require('./../controllers/user');

router.get('/profile', userController.getUserProfile);

module.exports = router;
