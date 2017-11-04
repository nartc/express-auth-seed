const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const util = require('util');
//Add this to the route you want to protect: 'passport.authenticate('jwt', {session:false})'
//example: router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {});

const config = require('../config/keys');
const User = require('../models/User');

//Register User
router.post('/register', (req, res) => {
  let newUser = new User({
    email: req.body.user.email,
    password: req.body.user.password
  });

  User.registerUser(newUser, (err, user) => {
    if(err) {
      return res.json({
        success: false,
        title: 'Error',
        message: 'Error registering new User',
        error: err
      });
    }

    res.json({
      success: true,
      title: 'Success',
      message: 'Successfully registered new User',
      user: user
    });
  });
});

//Login User
router.post('/login', (req, res) => {
  let email = req.body.credentials.email;
  let password = req.body.credentials.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) {
      return res.json({
        success: false,
        title: 'Error',
        messsage: 'Error fetching user by email',
        error: err
      });
    }

    if(!user) {
      return res.json({
        success: false,
        title: 'Error',
        message: `Email ${email} does not exist in our system.`
      });
    }

    User.comparePassword(password, user.password, (err, isMatched) => {
      if(err) {
        return res.json({
          success: false,
          title: 'Error',
          message: 'Error comparing password',
          error: err
        });
      }

      if(!isMatched) {
        res.json({
          success: false,
          title: 'Error',
          message: 'Password does not match.'
        });
      } else {
        jwt.sign({user: user}, config.secretKEY, {expiresIn: 18000}, (err, token) => {
          if(err) {
            return res.json({
              success: false,
              title: 'Error',
              message: 'Error authenticating',
              error: err
            });
          }

          res.json({
            success: true,
            title: 'Success',
            message: 'Logged In Successfully',
            authToken: `JWT ${token}`,
            user: {
              _id: user._id,
              email: user.email
            }
          });
        });
      }
    });
  });
});

module.exports = router;