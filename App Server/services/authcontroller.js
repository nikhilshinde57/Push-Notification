'use strict'
const express = require("express");
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const socket = require("./socketcontroller");

router.post('/login',(req,res)=>{
    
    Users.findOne({username:req.body.username},'password role userid username',(err,user)=>{

        if(err)
        {
            return res.status(500).send('Error on the server.');
        }
        if(!user)
        {
            return res.status(404).send('No user found.');
        }
        let password = bcrypt.compareSync(req.body.password, user.password);

        if(!password)
        {
            return res.status(401).send({auth:false,token:null});
        }
        let token = jwt.sign({username:user.username,userid:user.userid,role:user.role},config.JWT_SECRET_TOKEN,{
            expiresIn:1200
        });
        
        if(user.role!=="admin")
            socket.infromNS({"username":req.body.username,"userid":user.userid});

        res.status(200).send({auth:true,token:token});
    });
});

router.post('/logout',(req,res)=>{

    let token = req.headers['x-access-token'];
    
    if (!token) return res.status(404).send({ auth: false, message: 'No token found.' });
    
    jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded) {

        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

        global.socket.emit("offline",{
            "userid":decoded.userid,
            "username":decoded.username
        });         
        res.status(200).send({logout:true,token:null});
    });
});

module.exports = router;