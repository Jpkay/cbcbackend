const express = require('express');

//Importe mongoose inside server
const mongoose = require('mongoose');

// Import body-parser
const bodyParser = require('body-parser');

// Import database models
const FeedsModel = require('./models/FeedsModel.js');

// After importing, you want to execute the function
// Create the server object (by invoking the function express function)
// mongodb+srv://admin01:BenWilMax189@cluster0-mvz2r.mongodb.net/test?retryWrites=true&w=majority";
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const dbURL= "mongodb://admin01:BenWilMax189@cluster0-shard-00-00-mvz2r.mongodb.net:27017,cluster0-shard-00-01-mvz2r.mongodb.net:27017,cluster0-shard-00-02-mvz2r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }
).then(
    ()=>{
        console.log('You are connected to MongoDB');
    }
).catch(
    (e)=>{
        console.log('catch',e);
    }
)
// Below we are creating a route for the landing page
// " '/' " means the landing page of your website
// req is the request from a customer computer, res is the response you are going to give
// mongodb+srv://admin01:BenWilMax189@cluster0-vesp8.mongodb.net/test?retryWrites=true&w=majority
server.get(
    '/',
    (req, res) => {
        res.send("<h1>Welcome to jpwebsite.com</h1>" +
                "<a href='/about'>About</a" +
                "<a href='/Contact'>Contact</a" + 
                 "<a href='/Products'>Products</a");
    }
)
//Create a route for about page
server.get(
    '/about',
    (req, res) => {
        res.send("<h1>We are a chain of cafés bistros</h1>");
    }
)
//Create a route for contact us page
server.get(
    '/Contact',
    (req, res) => {
        res.send("<h1>You can contact us at info@jp.com</h1>");
    }
)
//Create a route for contact us page
server.get(
    '/Products',
    (req, res) => {
        res.send("<h1>croissants Rwf 1,500 - Cappuccino Rwf 2,000 </h1>");
    }
)
// A POST route for saving data into the 'feeds' collection
server.post(
    '/feeds',
    (req, res) => {

        // Read the 'Body' within POST request
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image
        };

        // Save the data to database (feeds collection)
        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();

        res.send('Your POST has been received.')
        console.log ('From the user ', formData);
    }
)

// A GET route for fetching data from the "feeds"
server.get(
    '/feeds',
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


//Create a route for 404 page
server.get(
    '/*',
    (req, res) => {
        res.send("<h1>sorry page doesn't exist</h1>");
    }
)
// Connect to port ( range 3000 - 9999)
// http://127.0.0.1 (aka http://localhost)
server.listen(
    8080, ()=>{
        console.log('You are connected!');
    }
)


// // Importing express inside your server
// const express = require('express');
// // Import mongoose inside server
// const mongoose = require('mongoose');
// // Import body-parser
// const bodyParser = require('body-parser');

// // Import database models
// const FeedsModel = require('./models/FeedsModel.js');
// const ProductsModel = require('./models/ProductsModel.js');

// // Create the server object
// const server = express();

// // Configure express to use body-parser
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());


// // Enter your database connection URL
// const dbURL= "mongodb://admin01:BenWilMax189@cluster0-shard-00-00-mvz2r.mongodb.net:27017,cluster0-shard-00-01-mvz2r.mongodb.net:27017,cluster0-shard-00-02-mvz2r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

// mongoose.connect(
//     dbURL,
//     {
//         'useNewUrlParser': true,
//         'useUnifiedTopology': true
//     }
// ).then(
//     ()=>{
//         console.log('You are connected MongoDB');
//     }
// ).catch(
//     (e)=>{
//         console.log('catch', e);
//     }
// )

// // Create a route for the landing page
// server.get(
//     '/',
//     (req, res) => {
//         res.send(
//             "<h1>Welcome to MyCars.com</h1>" +
//             "<a href='/about'>About</a>"
//             );
//     }
// );

// // Create a route for the about page
// server.get(
//     '/about',
//     (req, res) => {
//         res.send(
//             "<h1>About Us</h1>" +
//             "<a href='/'>Home</a>"
//         );
//     }
// );

// // Route for Contact
// server.get('/contact', (req, res)=>{
//     res.send('<h1>Contact Us</h1>')
// });


// // Route for Products
// server.get('/products', (req, res)=>{
//     res.send('<h1>Our Products</h1>')
// });

// // A POST route for saving data into the 'feeds' collection
// server.post(
//     '/feeds',
//     (req, res) => {

//         // Read the 'Body' within POST request
//         const formData = {
//             text: req.body.text,
//             username: req.body.username,
//             hashtags: req.body.hashtags,
//             image: req.body.image
//         };

//         // Save the data to database (feeds collection)
//         const newFeedModel = new FeedsModel(formData);
//         newFeedModel.save();

//         res.send('Your POST has been received.');
//     }
// );

// // A GET route for fetching data from the 'feeds' collection
// server.get(
//     '/feeds',
//     (req, res)=>{

//         // (1) Fetch all the documents using .find()
//         FeedsModel.find()

//         // (2) Once the results are ready, use .json() to send the results
//         .then(
//             (results) => {
//                 // res.json = res.send() + converts to JSON
//                 res.json(results)
//             }
//         )
//         .catch( 
//             (e)=> {
//                 console.log('error occured', e)
//             }
//         );

//     }
// );


// // POST route for products
// server.post(
//     '/products',
//     (req, res)=>{
//         // Capture the form data
//         const formData = {
//             brand: req.body.brand,
//             model: req.body.model,
//             price: req.body.price,
//             qty: req.body.qty,
//         }

//         // Instantiate the ProductsModel
//         const newProductsModel = ProductsModel(formData);
//         newProductsModel.save();

//         res.send('Product has been saved!');
//     }
// )

// // Route for 404
// server.get('*', (req, res)=> {
//     res.send('404! Page not found :(')
// });


// // Connect to port (range 3000 - 9999)
// // http://127.0.0.1:8080 (aka http://localhost:8080)
// server.listen( 
//     8080, ()=>{
//         console.log('You are connected http://127.0.0.1:8080!');
//     }
// );