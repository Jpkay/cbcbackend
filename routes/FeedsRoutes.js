// Import express
const express = require('express');
// Invoke the router ()
const router = express.Router();
// Import FeedsModel
const FeedsModel = require('../models/FeedsModel');

// A POST route for saving data into the 'feeds' collection
router.post(
    '/',
    (req, res) => {

        // Read the 'Body' within POST request
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image,
            likes: req.body.likes
        };

        // Save the data to database (feeds collection)
        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();

        res.send('Your POST has been received.')
        console.log ('From the user ', formData);
    }
)

//A POST route to add a like in a 'feeds' document
//__________________________________________________

router.post(
    '/likes',
    (req, res) => {


        FeedsModel.updateOne({_id:'5efef98913cc358ab167f832'}, {likes:'5ef720d6ed375d2a240c9d50'}, 
            function(err, result) {
                if (err) {
                    res.send (err);
                }
                else {
                    res.json(result);
                }

            })

        
    }
)




// //Testing a Get route to retrieve a certain Feed
// //__________________________________________________

// router.get(
//     '/likes',
//     (req,res)=>{
//         // Fetch the documents 
//         FeedsModel
//         .find({username: 'boubba'}) //no argument so no filter, will bring everying back
//         // Once the results are ready, use .json to send the results
//         .then(
//             (results) => {
//                 //res.json is doing res.send() + converts to JSON
//                 res.json(results)

//             }

//         )
//         .catch(
//             (e)=> {
//                 console.log('error occured', e)
//             }
//         )
//     }
// )

// //=================================================================================

//Testing a Get route to retrieve a certain Feed
//__________________________________________________

router.get(
    '/likes',
    (req,res)=>{
        // Fetch the documents 
        FeedsModel
        .find({likes: {$exists: true, $not: {$size:0}}}) //no argument so no filter, will bring everying back
        // Once the results are ready, use .json to send the results
        .then(
            (results) => {
                //res.json is doing res.send() + converts to JSON
                res.json(results)

            }

        )
        .catch(
            (e)=> {
                console.log('error occured', e)
            }
        )
    }
)

//=================================================================================





// A GET route for fetching data from the "feeds"
router.get(
    '/',
    (req,res)=>{
        // Fetch the documents 
        FeedsModel
        .find() //no argument so no filter, will bring everying back
        // Once the results are ready, use .json to send the results
        .then(
            (results) => {
                //res.json is doing res.send() + converts to JSON
                res.json(results)

            }

        )
        .catch(
            (e)=> {
                console.log('error occured', e)
            }
        )
    }
)

//Export the router
module.exports = router;