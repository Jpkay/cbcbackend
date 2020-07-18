const express = require('express');
//Importe mongoose inside server
const mongoose = require('mongoose');
// After importing, you want to execute the function
// Create the server object (by invoking the function express function)
const server = express();
const dbURL= "mongodb+srv://admin01:BenWilMax189@cluster0-mvz2r.mongodb.net/test?retryWrites=true&w=majority";
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