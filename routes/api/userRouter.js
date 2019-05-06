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

/**
 * @route POST api/user/login
 * @desc user login
 * @access Public
 */
router.route('/login')
    .post(userController.login);
    
module.exports = router;