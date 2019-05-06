const express = require('express');
const router = express.Router();

const profileController = require('../../controllers/profileController');

router.route('/test')
    .post(profileController.test);

module.exports = router;