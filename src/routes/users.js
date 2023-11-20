module.exports = (app) => {
    //const router = require("express").Router();
    //const axios = require("axios");
    const express = require("express")
    const userRoute = express.Router();
    const  usermodel = require("../model/user.js");
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    const token = process.env.token
    const validatePassword =require("../helpers/PassValidation.js")
    const Enc_Dec = require("../helpers/Enc_Dec.js")
    const constants = require("../helpers/constants.js")
    const mailer = require('../helpers/mailer.js')
  
    // userRoute.get('/',(req,res)=>{
    //     res.send('welcome user')
    // })
    userRoute.post('/',async(req,res)=>{
        const {LoginID}=req.body
        //console.log(LoginID);
        try {
            const user = await usermodel.find({LoginID:LoginID})
            res.send(user)
    
        } catch (error) {
            res.status(500).send("Error")
        }
    })
    userRoute.get('/logout', (req, res) => {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
            return res.send({ status: "failed", message: "Failed to logout" });
          }
          
          res.clearCookie('connect.sid'); // Clear the session cookie
          return res.send({ status: "success", message: "Logged out successfully" });
        });
      });
    userRoute.post('/login', async (req,res)=>{
        let {LoginID,Password}=req.body;
        console.log(req.body)
        const user  = await usermodel.find({LoginID});
        console.log(user);
        var getData = JSON.stringify(user);
        var data = JSON.parse(getData);
        
        try{
           
            if (user.length>0){
                const pass = data[0]["Password"];
                let npass = Enc_Dec.DecryptPass(pass);            
                    if (Password == npass){
                        let keyToken= jwt.sign({userId:user[0]._id},token)//setting up a token using the '_id' in user model
                        data={
                            keyToken:keyToken,
                            LoginID:user[0].LoginID,
                            Name:user[0].Name,
                            Email:user[0].Email
                        }
                        req.session.userId=LoginID;
                        req.session.Pass=Password;
                        req.session.save()
                        //console.log(data);
                        res.send(data)
                    }else{
                       return res.send({status:"failed",message:"Enter Valid Password ",})
                    }    
            }
            else{
                return res.send({status:"failed",message:"Enter valid User Id"})
            }
        }catch(error){
            console.log(error);
            return res.send({status:"failed",message:"invalid Credentials3 "})
        }
    });
    userRoute.post("/register",async(req,res)=>{
    const {LoginID, Name , Email ,Password }=req.body
    const getExistingUser = await usermodel.find({ Email: Email });   
    const getExistingloginID = await usermodel.find({ LoginID: LoginID });   
    // console.log(getExistingUser);
    const valid = validatePassword(Password)
    
    
    try{
        if (getExistingloginID!=""){
            return res.send({ status: "failed", message: "Choose different login Id.." });
        }else{
        if (getExistingUser != "") {
            return res.send({ status: "failed", message: "Email already exist." });
          }else{
            if(valid){
                //console.log(valid[0]);
                return res.send({status: "failed",message:valid[0]})
         
            } else{
                
            console.log(Password);
            var Encpass = Enc_Dec.EncryptPass(Password);
            console.log(Encpass);            
            const user = new usermodel({LoginID:LoginID,
                Password:Encpass,
                Name:Name,
                Email:Email})//the password from the body and hashed password is different
            await user.save();
            //await mailer.createmail(LoginID,Password,Name,Email)
            res.send("User Registered Successfully"); 
               
            }
        }
        }
    
    }catch(err){
        console.log(err);
        res.send("Error...");
    }
});
userRoute.post  ('/edit/:id',async (request, response) => {
    const { id } = request.body;
    try {
      const result = await usermodel.findById(id);
      response.send({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  });
userRoute.patch('/update/:id',async(req,res)=>{

    const ID = req.params.id
    const payload = req.body
    const user = await usermodel.findOne({_id:ID})
    const DBuserID = user.userID
    const userID_in_req = req.body.userID
    try {
        if(DBuserID != userID_in_req){
            res.send({
                ...constants.status500(),
                ...constants.message("User is not validate")
            })
        }
        else{

            await usermodel.findByIdAndUpdate({_id:ID},payload)
            res.status(200).send("Updated")
        }
    } catch (error) {
        res.status(500).send("something went wrong",error)
    }
})
userRoute.delete('/delete/:id',async(req,res)=>{
    //console.log(req.params);
    const ID = req.params.id
    const user = await usermodel.findOne({_id:ID})
    const DBuserID = user.userID
    const userID_in_req = req.body.userID
    try {
        if(DBuserID != userID_in_req){
            res.send("You're not authorized")
        }
        else{

            await usermodel.findByIdAndDelete({_id:ID})
            res.send("Deleted")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// userRoute.get("/mails", async(req,res)=>{
//     console.log("Rutvik_mail");
//     createmail("Rutvik","RP5011","Rp-12345","patilrutvik501@gmail.com")
//    })


app.use("/user", userRoute);
  };
  