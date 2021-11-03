let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');
let passport = require('passport');
let contactController = require('../controllers/contact');

// helper function for gaurding purposes
const requireAuth = (req, res, next) => 
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


// GET route for the contact page - READ
router.get('/', requireAuth, contactController.displayContactList);

// GET route for displaying the Add page - CREATE
router.get('/add', requireAuth, contactController.displayAddPage);

// POST route for processing the Add page - CREATE
router.post('/add', requireAuth, contactController.processAddPage);

// GET route for displaying the Edit page - UPDATE
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

// POST route for processing the Edit page - UPDATE
router.post('/edit/:id', requireAuth, contactController.processEditPage);

// GET to perform the Deletion - DELETE
router.get('/delete/:id', requireAuth, contactController.performDeletion);

module.exports = router;