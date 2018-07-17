'use strict'
const db = require('../db');
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(db.createConnection(config.DB.mongodb_url));

let users = db.Schema({
    username: { type: String, required: true },
    userid: { type: Number, required: true },
    email: { type: String, required: true },
    birthdate: { type: Date, required: false },
    contact: { type: Number, required: true },
    city :{type:String, required : true },
    gender : {type : String, required : true},
    role : {type : String, required : true},
    occupation :{type : String , required: false},
    password: { type: String, required: true, select: false },
    created : {type : Date, default: Date.now}
});

//users.plugin(autoIncrement.plugin,{ model: 'users', field: 'userid' });

users.plugin(autoIncrement.plugin, { model: 'users', field: 'userid',startAt: 101,incrementBy: 1 });


module.exports = db.model('Users',users);