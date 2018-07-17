'use strict'
const express = require("express");
const router = express.Router();
const notification = require('../DAL/notification_repository');
var jwt = require('jsonwebtoken');

router.post("/",(req,res)=>{

    let token = req.headers['x-access-token'];
    
    if (!token) return res.status(404).send({ auth: false, message: 'No token found.' });
    
    jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded) {

      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

      if(decoded.role=='admin')
      {
        notification.publish(req.body);
        res.status(200).send({message_sent:true,token:token});
      }
      else
      {
        res.status(401).send({ auth: false, message: 'The user might not have the necessary permissions to publish message' });    
      }
    })
});

module.exports = router; 