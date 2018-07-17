'use strict'
const amqp = require('amqplib/callback_api');
const channel = require('../DAL/channel_repository');

function obj(){
    this.subscribe = (req,res)=>{
        amqp.connect(config.RabbitMQ_URL, (err, conn)=> {
            conn.createChannel((err, ch)=> {

                ch.assertExchange(req.channel, 'fanout', {durable: true});
                ch.assertQueue(req.unsername, {durable: true});
                ch.bindQueue(req.unsername, req.channel, req.channel);
                channel.subscribe(req)
                .then(()=>{
                    console.log(req.unsername +" is successfully subscibed to the channel req.channel");
                })
                .catch((err)=>{
                    debugger;
                })
            });
        });       
    }

    this.unsubscribe =(req,res)=>{
        amqp.connect(config.RabbitMQ_URL, (err, conn)=> {
            conn.createChannel((err, ch)=> {
                ch.unbindQueue(req.unsername, req.channel, req.channel);

                channel.unsubscribe(req);
            });
        });
    }   
}

module.exports = new obj();