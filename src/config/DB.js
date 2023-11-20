const mongoose = require("mongoose");

// const connectDB = async(DATABASE_URL) =>{
//     mongoose .connect( process.env.DB_HOST,{   useNewUrlParser: false,  } )
//     .then(() => { console.log("Successfully connected  "); })
//     .catch((error) => { console.log("Unable to connect  ");
//       console.error(error); });
// }

const DB_HOST = process.env.DB_HOST
const connectDB =async()=>{ mongoose.set('strictQuery', false)
    mongoose.connect(`${DB_HOST}`).then(()=>{
  console.log("Connected to DB");
}).catch((e)=>{
  console.log("Unable to connect  ")
  console.log(e);
})}


module.exports = connectDB;
//pm2 start ecosystem.config.js --env Home --watch