const express = require('express');

//Importe mongoose inside server
const mongoose = require('mongoose');

// Import body-parser
const bodyParser = require('body-parser');
// Import passport
const passport = require('passport');

// Import the strategies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = 's3cr3t100';

const UsersModel = require('./models/UsersModel.js');

const passportJwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
};

const passportJwt = () => {
    passport.use(
        new JwtStrategy(
            {},
            (jwtPayload, done) => {
                // Extract and find the user by their id (contained in webtoken)
                UsersModel.findOne({_id: jwtPayload.id})
                .then(
                    // If the document was found
                    (document) => {
                        return done (null, document);
                    }
                   
                )
                .catch(
                    //if something went wrong with DB seard
                    (err) => {
                        return done(null, null);
                    }
                )
            }
        )
    )
};

//Import routes
const ProductsRoutes = require('./routes/ProductsRoutes')
const FeedsRoutes = require('./routes/FeedsRoutes')
const UsersRoutes = require('./routes/UsersRoutes')

// Import database models
const FeedsModel = require('./models/FeedsModel.js');
const ProductsModel = require('./models/ProductsModel.js');
const UsersModel = require('./models/UsersModel.js');

// After importing, you want to execute the function
// Create the server object (by invoking the function express function)
// mongodb+srv://admin01:BenWilMax189@cluster0-mvz2r.mongodb.net/test?retryWrites=true&w=majority";
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(passport.initialize());
passportJwt(passport);

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

//whenever there is a request for products, use ProductsRoutes
server.use(
    '/products', // this means http://localhost:8080/products
    ProductsRoutes
);

server.use(
    '/feeds', // this means http://localhost:8080/feeds
    FeedsRoutes
);

server.use(
    '/users', // this means http://localhost:8080/users
    UsersRoutes
);

// Create a route for the landing page
server.get(
    '/',
    (req, res) => {
        res.send(
            "<h1>Welcome to MyCars.com</h1>" +
            "<a href='/about'>About</a>"
            );
    }
);

// Create a route for the about page
server.get(
    '/about',
    (req, res) => {
        res.send(
            "<h1>About Us</h1>" +
            "<a href='/'>Home</a>"
        );
    }
);

// Route for Contact
server.get('/contact', (req, res)=>{
    res.send('<h1>Contact Us</h1>')
});


// Route for Products
server.get('/products', (req, res)=>{
    res.send('<h1>Our Products</h1>')
});

// Route for Users
server.get('/users', (req, res)=>{
    res.send('<h1>Our Users</h1>')
});






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

