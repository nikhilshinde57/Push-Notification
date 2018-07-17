'use strict'
const mongoose = require("mongoose");

const url = config.DB.mongodb_url;

mongoose.connect(url,()=>{
    console.log("Connected to DB successfully!!!");
})

module.exports = mongoose;