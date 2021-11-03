/*
  Author: Mark Randall
  Date: October 6th, 2021
  COMP229 Web App Development
  Fall Semester
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// JWT
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User model
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('templates/home', { title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('templates/about', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('templates/projects', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('templates/services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('templates/contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if user is logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
             title: 'Login',
             messages: req.flash('loginMessage')
             //displayName: req.user ? req.user.displayName : ''
        })        
    }
    else
    {        
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        // if server error
        if(err) 
        {
            return next(err);
        }
        // if user login error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication failed');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // if server error
            if(err) 
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            /* TODO - getting ready to covnert to API */
            /* res.json({success: true, msg: 'User logged in successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken}); */

            return res.redirect('/contact-list');
        });
    })(req, res, next);
}


module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user) 
    {
        res.render('auth/register', 
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log('Error: Inserting new User: ' + newUser.displayName);
            if(err.name == 'UserExistsError')
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists');   
                return res.redirect('auth/login', {
                    title: 'Login',
                    messages: req.flash('loginMessage')
                    //displayName: req.user ? req.user.displayName : ''
                })             
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful, so redirect and authenticate

            // TODO - getting ready to convert to API
            //res.json({success: true, msg: 'User registration successful!'});

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list');
            });
        }
    });
}

module.exports.performLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}
