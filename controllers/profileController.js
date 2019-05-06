const profileModel = require('../models/profileModel');
const userModel = require('../models/userModel');

module.exports = {
    
    /**
     * @controller  GET api/profile/test
     * @desc        Tests profile controller
     * @access      Public
     */
    test: async (req, res) => {
        res.status(200).json({message: "Profile Works!"});
    },

    /**
     * @controller  GET api/profile
     * @desc        Get current users profile
     * @access      Private
     */
    getProfile: async (req, res) => {
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
    },

    /**
     * @controller  POST api/profile
     * @desc        Create or edit user profile
     * @access      Private
     */
    postProfile: async (req, res) => {
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

        // Skills - split into array
        if(typeof req.body.skills !== 'undefined'){
            profileFields.skills = req.body.skills.split(',');
        }

        // Social
        profileFields.social = {};
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

        profileModel.findOne({user: req.user.id})
            .then(profile => {
                if(profile){
                    profileModel
                        .findOneAndUpdate(
                            {user: req.user.id},
                            {$set: profileFields},
                            {new: true}
                        )
                        .then(profile => res.status(200).json(profile))
                        .catch(err => res.status(404).json(err));
                }else{
                    // Check if handle exists
                    profileModel
                        .findOne({handle: profileFields.handle})
                        .then(profile => {
                            if(profile){
                                errors.handle = 'That handle already exists';
                                return res.status(400).json(errors);
                            }
                            new profileModel(profileFields)
                                .save()
                                .then(profile => res.json(profile))
                                .catch(err => res.status(404).json(err));
                        })
                        .catch(err => res.status(404).json(err));
                }
            })
            .catch(err => res.status(404).json(err));
    }
}