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

app.use('/api',api);

app.listen(PORT,()=>{
    console.log("Server started on "+PORT);
});
