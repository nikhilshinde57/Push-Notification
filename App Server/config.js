const config = {

    DB:{        
        mongodb_url : 'mongodb://127.0.0.1:27017'        
    },
    JWT_SECRET_TOKEN:'Yqwhjh34h',
    RabbitMQ_URL:'amqp://localhost',
    NotificationServer:"http://localhost:4000",
    PORT:3000,

};

module.exports = config;