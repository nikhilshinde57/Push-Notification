'use strict'
const io = require('socket.io-client');
global.socket= null;

function obj(){

    this.infromNS=(user)=>{

            global.socket = io.connect(global.config.NotificationServer, {reconnect: true});
       
            socket.on('connect', function(test) {    

            console.log("Connected to Notification Server "+global.config.NotificationServer);

            socket.emit("online",user);

            socket.on("message",(msg)=>{
                console.log(JSON.stringify(msg));               
            })
        });
    }
};

module.exports = new obj();