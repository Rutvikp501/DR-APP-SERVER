"use strict";
var jwt = require("jsonwebtoken");
const constants = require('../helpers/constants')
const token = process.env.token;

const Authentication=(req,res,next)=>{
    console.log(req);
    const key =req.headers.Authentication
    //const key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhlZjQxZmUzNzJkYjhlMDNmODgwNjQiLCJpYXQiOjE2ODcxMDk1NDB9.zwF4wIriUjke6Nu2cqGashmhT99BuzeVGPRYUY2HGvs"
    if(key){
        const decode = jwt.verify(key,token)//decodeing the token
        if (decode){
            const UserID =decode.UserID//we get tokenized user id 
            req.body.UserID= UserID // added to req body so i can acces it in any route
            next()
        }else{
            res.send({
                ...constants.message("please login first")
            })
        }
    }else{
        res.send({
            ...constants.message("please login first")
        })
        
    }
}
module.exports= Authentication();