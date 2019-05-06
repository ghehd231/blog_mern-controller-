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
        },

    /**
     * @controller  POST api/user/login
     * @desc        user login
     * @access      Public
     */
    login: async (req, res) => {
        const {errors, isValid} = validationLoginInput(req.body);

        if(!isValid){
            res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        /** Find users by email */
        userModel.findOne({email})
            .then(user => {
                if(!user){
                    errors.email = 'Users not found';
                    return res.status(400).json(errors);
                }
                
                bcrypt
                    .compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            const payload = {id: user.id, name: user.name, avatar: user.avatar};
                            // Sign Token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {expiresIn: 3600},
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                }
                            )
                        }else {
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors);
                        }
                    })
                
            })
            .catch(err => res.status(404).json(err));
    }

        
}