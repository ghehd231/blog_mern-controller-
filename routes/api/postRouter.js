const express = require('express');
const router = express.Router();

const postController = require('../../controllers/postController');

/** Use passport */
const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});


/**
 * @route   GET api/post/test
 * @desc    Tests post route
 * @access  Public
 */
router.route('/test')
    .post(postController.test);

/**
 * @route   GET api/profile
 * @desc    Get current users profile
 * @access  Private
 */
router.route('/').get(authCheck, profileController.home);


module.exports = router;