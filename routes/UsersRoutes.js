// // register
// // login
// // Import express package

// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const UsersModel = require('../models/UsersModel')

// // POST route for users
// // register
// router.post(
//     '/register', // http://localhost:8080/users/register
//     (req, res)=>{
//         // Capture the form data
//         const formData = {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password,
//         }

//         // Step 1) Generate a salt
//         // Step 2) Use a salt to generate a hash
//         // Step 3) Replace the original password with hash
//         // Step 4) Save user data to DB

//         // Step 1) Generate a salt
//         bcrypt.genSalt(
//             (err, salt) => {
//                 bcrypt.hash(
//                     formData.password, // first ingredient
//                     salt, // second ingredient
                    
//                     (err, hashedPassword) => {
//                             // Instantiate the UsersModel
//                         const newUsersModel = new UsersModel(formData);
//                         newUsersModel.password = hashedPassword;
//                         newUsersModel.save(
//                         (err, dbResult) => {
//                             if(err) {
//                                 res.send(err);
//                             }
//                             else{
//                              res.send('User has been saved!');
//                             }
//                         }
//                         );
//             }
//                 )
        

//     }
// )
// //Export the router
// module.exports = router;


//---------------

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET


const UsersModel = require('../models/UsersModel');

// /register
router.post(
    '/register',     // http://localhost:8080/users/register
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };


        // Step 1) Generate a salt
        bcrypt.genSalt(
            (err, salt) => {

                // Step 2) Generate a hash
                bcrypt.hash(
                    formData.password, // first ingredient
                    salt, // second ingredient
                    (err, hashedPassword) => {

                        const newUsersModel = new UsersModel(formData);

                        // Step 3) Replace the original password with hash
                        newUsersModel.password = hashedPassword;

                        // Step 4) Save user data to database (with encrypted password)
                        newUsersModel.save(
                            (err, dbResult) => {

                                // If something goes wrong, send error
                                if(err) {
                                    res.json(err);
                                }
                                // Otherwise, send success message
                                else {
                                    res.json({message:"User has been saved"})
                                }
                            }
                        );
                        
                    }
                )
            }
        );



        

        
    }
);


// /login
router.post(
    '/login',
    (req,res) =>{
        // npm packages: passportjs, passportjwt, jsonwebtoken
        
        //Step 1. Capture formData (email & password)
        const formData = {
            email: req.body.email,
            password: req.body.password
        }
        
        //Step 2a. In database, find account that matches email
        UsersModel.findOne(
            {email: formData.email},
            (err,document) => {

                //Step 2b. If no email match, reject the login request
                if(!document){
                    res.json('Please check your email or password');
                }
                //Step 3. If matching email, examine the document's password
                else {

                    //Step 4. Compare the encrypted password in db with incoming password
                    bcrypt.compare(formData.password, document.password).then(
                        (isMatch) =>{
                            
                            //Step 5a. If the password matches, geenrate a web token (JWT);
                            if(isMatch) {
                                //Step 6. Send the JWT to the client
                                const payload = { 
                                    id: document.id,
                                    email: document.email
                                }

                                jwt.sign(
                                    payload,
                                    secret,
                                    (err, jsonwebtoken) => {
                                        res.json(
                                            {
                                                msg: 'Login Successful',
                                                jsonwebtoken: jsonwebtoken
                                            }
                                        )
                                    }
                                )

                            }

                            //Step 5b. If password not match, reject login request
                            else {
                                res.json('Please check your email or password')

                            }

                        }
                    )

                }

                }
        )


        
        
        
        
        
        
    }
)
module.exports = router;