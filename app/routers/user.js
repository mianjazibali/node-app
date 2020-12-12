const userController = require('./../controllers/user');
const { Router } = require('express');
const router = Router();

router.get('/', userController.getAllUsers);

module.exports = router;
