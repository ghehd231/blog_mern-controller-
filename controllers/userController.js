const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Call User Model
const userModel = require('../models/userModel');

module.exports = {
    test: async (req, res) => {
        res.status(200).json({message: "User Works!"})
    },

    /**
     * @controller  POST api/user/register
     * @desc        user register
     * @access      Public
     */
    register: async (req, res) => {
        userModel
            .findOne({email: req.body.email})
            .then(user => {
                if(user){
                    return res.status(400).json({message: "This email already exists."});
                }

                /** Create new avatar */
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                /** Create New User */
                const newUser = new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                /** After password encryption, sign up */
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.status(200).json(user))
                            .catch(err => res.status(404).json(err));
                    });
                });
            })
            .catch(err => res.status(404).json(err));
        }
}