'use strict'
const express = require("express");
const router = express.Router();
const channel = require('../BL/channel_bl');
var jwt = require('jsonwebtoken');
router.post('/subscribe',(req,res)=>{

    let token = req.headers['x-access-token'];   
    
    if (!token) return res.status(404).send({ auth: false, message: 'No token found.' });
    
    jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded) {

      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

      if(decoded.role!='admin')
      {
        channel.subscribe(req.body);
        res.status(200).send({subscribed:true,token:token});
      }
      else
      {
        res.status(401).send({ auth: false, message: 'The user might not have the necessary permissions to publish message' });    
      }
    })
});

router.post('/unsubscribe',(req,res)=>{

    let token = req.headers['x-access-token'];
    
    if (!token) return res.status(404).send({ auth: false, message: 'No token found.' });
    
    jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded) {

      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

      if(decoded.role!='admin')
      {
        channel.unsubscribe(req.body);
        res.status(200).send({unsubscribe:true,token:token});
      }
      else
      {
        res.status(401).send({ auth: false, message: 'The user might not have the necessary permissions to publish message' });    
      }
    })
});

module.exports = router;