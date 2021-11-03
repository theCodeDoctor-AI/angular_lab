let express = require('express');

let jwt = require('jsonwebtoken');

// create a reference to the model 
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find({}).sort({'name': 1}).exec((err, contactList) => {
        if (err) 
        {
            return console.error(err);
        }
        else
        {
            // console.log(ContactList);
            res.render('biz_contact/list', 
            {
                title: 'Contact List', 
                ContactList: contactList, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    res.render('biz_contact/add', 
    {
        title: 'Add Contact', 
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "contact_number": req.body.contact_number,
        "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) => {
        if (err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if (err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit page
            res.render('biz_contact/edit', 
            {
                title: 'Edit Contact', 
                Contact: contactToEdit, 
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "contact_number": req.body.contact_number,
        "email": req.body.email
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if (err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    })
}