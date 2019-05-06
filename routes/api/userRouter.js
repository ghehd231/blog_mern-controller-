const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

// Use passport
const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});


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
 * @route  GET api/user/current
 * @desc   return current user
 * @access Private
 */
router.route('/current').get(authCheck, userController.current);

/**
 * @route POST api/user/login
 * @desc user login
 * @access Public
 */
router.route('/login')
    .post(userController.login);

module.exports = router;