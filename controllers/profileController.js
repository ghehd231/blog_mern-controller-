const profileModel = require('../models/profileModel');
const userModel = require('../models/userModel');

module.exports = {

    /**
@@ -7,5 +10,24 @@ module.exports = {
     */
    test: async (req, res) => {
        res.status(200).json({message: "Profile Works!"});
    },

    /**
     * @controller  GET api/profile
     * @desc        Get current users profile
     * @access      Private
     */
    home: async (req, res) => {
        const errors = {};

        profileModel.findOne({user: req.user.id})
            .then(profile => {
                if(!profile){
                    errors.noProfile = 'No profile for this user.'
                    return res.status(400).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
} 