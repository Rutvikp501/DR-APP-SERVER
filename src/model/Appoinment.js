const mongoose = require("mongoose");
const AppoinmentSchema = mongoose.Schema({
  
  AppoinmentNo: {type:String},
    PName: {type:String},
    Age: {type:String},
    relation: {type:String},
    MobileNo: {type:String},
    userID: {type:String},
    Apstatus: { type: String, trim: true,default: '0' },
    date: { type: Date, default: Date.now },
  });
  
  const  Appoinmentmodel=mongoose.model("Appoinment",AppoinmentSchema) //when server starts the Database and Collection will be created automatically

  module.exports={
    Appoinmentmodel
  }

  // {
  //   "PName": "Name of p",
  //   "Age": "Age",
  //   "relation": "if self then self else relation with the user",
  //   "MobileNo": "mobile no",
  //   "userID": "userID"
  // }