'use strict'
const express = require("express");
const app = express();

let usercontroller = require(__base+"/services/usercontroller");
let authcontroller = require(__base+"/services/authcontroller");
let notificationcontroller = require(__base+"/services/notificationcontroller");
let channelcontroller = require(__base+"/services/channelcontroller");

app.use('/users',usercontroller);

app.use('/auth',authcontroller);

app.use('/notifications',notificationcontroller);

app.use('/channels',channelcontroller);

module.exports = app;