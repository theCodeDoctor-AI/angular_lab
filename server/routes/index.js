/*
  Author: Mark Randall
  Date: September 24th, 2021
  COMP229 Web App Development
  Fall Semester
 */


const express = require('express');
const router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

/* GET about us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

// GET route for displaying the Login page
router.get('/login', indexController.displayLoginPage);

// POST route for processing the Login page
router.post('/login', indexController.processLoginPage);

// GET route for displaying the Register page
router.get('/register', indexController.displayRegisterPage);

// POST route for processing the Register page
router.post('/register', indexController.processRegisterPage);

// GET to perform User Logout
router.get('/logout', indexController.performLogout);

module.exports = router;
