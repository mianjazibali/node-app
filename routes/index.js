const { Router } = require('express');
const controllers = require('../app/controllers');

const router = Router();

router.get('/', controllers.user.getAllUsers);

module.exports = router;
