const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

router.route('/test')
    .post(userController.test);

module.exports = router;