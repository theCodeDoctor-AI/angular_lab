let mongoose = require('mongoose');

// create a model class for the business contacts
let contactModel = mongoose.Schema({
    "name": String,
    "contact_number": String,
    "email": String
},
{
    collection: 'biz_contacts'
});

module.exports = mongoose.model('Contact', contactModel);