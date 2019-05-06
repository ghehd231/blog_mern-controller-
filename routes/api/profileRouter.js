const express = require('express');
const router = express.Router();

/** controller */
const profileController = require('../../controllers/profileController');

/** Use passport */
const passport = require('passport');
const authCheck = passport.authenticate('jwt', {session: false});


/**
 * @route   GET api/profile/test
 * @desc    Tests profile route
 * @access  Public
 */
router.route('/test')
    .post(profileController.test);

/**
 * @route   GET api/profile
 * @desc    Get current users profile
 * @access  Private
 */
router.route('/').get(authCheck, profileController.getProfile);

/**
 * @route   POST api/profile
 * @desc    Create or edit user profile
 * @access  Private
 */
router.route('/').post(authCheck, profileController.postProfile);

module.exports = router;