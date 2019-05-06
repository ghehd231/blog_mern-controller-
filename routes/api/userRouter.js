const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

router.route('/test')
    .post(userController.test);
/**
 * @route  POST api/user/register
 * @desc   user register
 * @access Public
 */
router.route('/register')
    .post(userController.register);

module.exports = router;