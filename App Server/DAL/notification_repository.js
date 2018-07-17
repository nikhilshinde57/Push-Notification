'use strict'
const amqp = require('amqplib/callback_api');

function obj(){

    this.publish = (req)=>{

        amqp.connect(config.RabbitMQ_URL, function(err, conn) {
        
        if(err)
        {
            console.log(err);
        }
        conn.createChannel((err, ch)=>{

            ch.assertExchange(req.exchangeName, 'fanout', {durable: true});
            ch.publish(req.exchangeName, req.bindingKey, new Buffer(req.message));            
            console.log("Notification message sent to Exchange'"+req.message+"' !!");
            });
        });
    }
}

module.exports = new obj();