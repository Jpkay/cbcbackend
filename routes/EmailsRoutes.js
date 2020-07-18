// Import express package
const express = require('express');
const router = express.Router();
const EmailsModel = require('../models/EmailsModel')

// POST route for products
router.post(
    '/register', // http://localhost:8080/emails/register
    (req, res)=>{
        // Capture the form data
        const formData = {
            email: req.body.email,
            
        }

        // Instantiate the ProductsModel
        const newEmailsModel = new EmailsModel(formData);
        newEmailsModel.save();

        res.json({message: 'Email has been saved!'});
    }
)
//Export the router
module.exports = router;



// // Import express into the file
// const express = require('express');
// const router = express.Router();
// const EmailsModel = require('../models/EmailsModel');


// // POST route for products
// router.post(
//     '/register',
//     (req, res)=>{
//         // Capture the form data
//         const formData = {
//             email: req.body.email,
//         }

//         // Instantiate the EmailsModel
//         const newEmailsModel = EmailsModel(formData);
//         newEmailsModel.save();

//         res.send('Email has been saved!');
//     }
// );

// // Export the router
// module.exports = router;