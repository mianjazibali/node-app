const { Router } = require('express');
const router = Router();

const verifyToken = require('../../middleware/verifyToken');
const userController = require('./../controllers/user');

router.get('/', verifyToken, userController.getAllUsers);

module.exports = router;
