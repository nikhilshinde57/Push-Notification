'use strict'
global.__base = __dirname;
global.config = require('./config');
const express = require("express");
const api = require('./routes/api');
const app = express();
const PORT = process.env.PORT || config.PORT;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded 
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded());   // parse application/x-www-form-urlencoded


// Connect to server
// var io = require('socket.io-client')
// var socket = io.connect('http://localhost:4000', {reconnect: true});



// // Add a connect listener
// socket.on('connect', function(test) {    

//     console.log("Connected to http://localhost:4000")

//     socket.emit("online",{
//         "username":"nikhilshinde57",
//         "userid":12
//     });

//     socket.on("message",(req)=>{
//         console.log(req.toString());
//         socket.emit("offline",{
//             "username":"nikhilshinde57",
//             "userid":12
//         })
//     })
// });


app.use('/api',api);

app.listen(PORT,()=>{
    console.log("Server started on "+PORT);
});