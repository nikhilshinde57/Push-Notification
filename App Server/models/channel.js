'use strict'
const db = require('../db');

let channels = db.Schema({
    name: { type: String, required: true },
    subscribers: [String],
    created : {type : Date, default: Date.now}
});

module.exports = db.model('Channels',channels);