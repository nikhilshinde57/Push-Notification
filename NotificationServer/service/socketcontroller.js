'use strict'
const express = require("express");
const app = express();
const PORT = process.env.PORT || config.PORT;

/**
 * Start new server use express app
 */
let server = require('http').createServer(app);
/**
 *Enables real-time bidirectional event-based communication. 
 */
const io = require('socket.io')(server);

server.listen(PORT,()=>{
    console.log("Server started on PORT "+PORT+"!!!");
});

module.exports = io;
