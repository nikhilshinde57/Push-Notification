'use strict'
const amqp = require('amqplib/callback_api');
function obj(){

    this.openConnection=()=>{        
        amqp.connect(config.RabbitMQ_URL, function(err, conn) {
            global.connection =conn;
            console.log("Connection created with RabbitMQ!!!");
        });  
    };

    this.createchannel=(conn,queue,userid,socket,io)=>{

        conn.createChannel(function(err, ch) {

            console.log("Channel created for User "+queue);            
            global.onlineusers[userid] = ch;
            global.onlineusers[queue] = socket.id;

            ch.consume(queue, function(msg) {                       
                console.log("Msg received for Queue "+ queue+" . Message received is "+ msg.content.toString());
                var message={
                    "username":queue,
                    "content":msg.content.toString()
                };
                
                io.to(global.onlineusers[queue]).emit("message",message);
    
            }, {noAck: true});
            
       });
    };
}

module.exports = new obj();