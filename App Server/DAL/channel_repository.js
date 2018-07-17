'use strict'
const Channels = require('../models/channel');

function obj (){

    this.subscribe = (req)=>{

        return new Promise((resolve,reject)=>{

        Channels.findOne({name:req.channel},(err, doc)=>{
            if(err)
                reject(err);
            else if(doc.subscribers.indexOf(req.unsername)<0)
            {
                doc.subscribers.push(req.unsername);
                doc.save();
                resolve();
            }
        });
    });
}

    this.unsubscribe = (req)=>{

        Channels.findOne({name:req.channel},(err, doc)=>{           
            
            let index = doc.subscribers.indexOf(req.unsername);
            if(index>=0)
            {               
                doc.subscribers.splice(index, 1);
                doc.save();
            }
        });
    }
};

module.exports = new obj();