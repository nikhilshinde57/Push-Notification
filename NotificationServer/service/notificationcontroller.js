'use strict'
const io = require('./socketcontroller.js');
const chanCtrl = require('./channelcontroller.js');

chanCtrl.openConnection();

function obj(){

    this.start =()=>{
      
        io.on("connection",(socket)=>{
      
            global.socketIDS.push(socket.id);
            console.log("Connected");
            
            socket.on("online",(req)=>{

                chanCtrl.createchannel(global.connection,req.username,req.userid,socket,io);

            });

            socket.on("offline",(req)=>{                
                let channel = global.onlineusers[req.userid];
                channel.close();        
                console.log("Channel closed for "+req.username);
            })
        });
    };    
};

module.exports = new obj();