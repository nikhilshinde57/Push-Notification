'use strict'
global.config = require('./config');
global.__base = __dirname;
const notificationServer = require('./Service/notificationcontroller.js');
global.onlineusers={};
global.socketIDS=[];

setTimeout(() => {
    notificationServer.start();    
}, 1000);