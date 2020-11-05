const express = require('express');
const router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//  route   GET  api/auth
//  @desc   gets logged in user
//  Private
router.get('/', (req, res) => {
  res.send('Get logged in user')
})

//  route   POST  api/auth
//  @desc   auth user and get token
//  Public
router.post(
  '/', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body

    try {
      let user = await User.findOne({ email})

      // if the user is not found with the email, Invalid credential msg is sent
      if(!user) {
        return res.status(400).json({ msg: 'Invalid Credentials'})
      }

      // compare the entered unhased password(pasword) by the user with the hashed password in the db(user.password)
      const isMatch = await bcrypt.compare(password, user.password)

      // if the passwords don't match, send out a msg: invalid credentials
      if(!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials'})
      }

      const payload = {
				user: {
					id: user.id
				}
			};

			// generates a token
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
      );
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  
})

module.exports = router