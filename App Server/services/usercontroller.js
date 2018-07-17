'use strict'
const express = require("express");
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register',function(req,res, next){

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password=hashedPassword;
    let users = new Users(req.body);

    users.save(function (err, user) {
        if (err) {
        res.status(500).send({ error: err, token: null });
        }
        console.log('User successfully registered!');
        res.status(200).send({ auth: true, token: null });
      });
});

router.get('/:username',(req,res)=>{

    let token = req.headers['x-access-token'];
    
    if (!token) return res.status(404).send({ auth: false, message: 'No token found.' });
    
    let userName =req.params.username;
    
    jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded,) {

      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
      
      Users.findOne({username: userName},(err,user)=>{
          if(err)
          {
            return res.status(500).send('Error on the server.');
          }
          if(!user)
          {
            return res.status(404).send('No user found.');
          }
          res.status(200).send(user);
      })      
    });
})

module.exports = router; 