const express = require('express');
const router = express.Router();

const postController = require('../../controllers/postController');

/**
 * @route   GET api/post/test
 * @desc    Tests post route
 * @access  Public
 */
router.route('/test')
    .post(postController.test);

module.exports = router;