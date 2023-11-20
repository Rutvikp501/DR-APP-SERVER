module.exports = (app)=>{
const express = require('express')
const AppoinmentRouter = express.Router()
const  {Appoinmentmodel} = require('../model/Appoinment')
//const {authenticate} = require('../Middleware/Auth')

AppoinmentRouter.post('/',async(req,res)=>{
    const CurrenPNo1 = await Appoinmentmodel.find({ Apstatus: "1" });
    const CurrenPNo = CurrenPNo1[0].AppoinmentNo;
    const {LoginID}=req.body
    try {
        const Users_Appoinments = await Appoinmentmodel.find({userID:LoginID})
        const data={
            CurrenPNo:CurrenPNo,
            Users_Appoinments:Users_Appoinments
        }
        res.send(data)
    } catch (error) {
        res.status(500).send("Error")
    }
})

//AppoinmentRouter.use(authenticate)
AppoinmentRouter.post('/create',async(req,res)=>{
    //console.log(req.body);
    const {PName,Age,relation,MobileNo,userID} = req.body
    
    let AppoinmentNos = "";
      const data1 = await Appoinmentmodel.find().sort({ _id: -1 }).limit(1);
      //console.log(data1);
      const data2 = await Appoinmentmodel.find().sort({ _id: 1 }).limit(1);
    if (data1 != "") {
        let AppoinmentNo1 = data1[0].AppoinmentNo;  
        let nextAppoinmentNo = parseInt( AppoinmentNo1) + parseInt(1);
        AppoinmentNos = ("00"+nextAppoinmentNo).slice(-3);
      }else{
        AppoinmentNos="001"
      }
    try {
        const Appoinment = new Appoinmentmodel(
            {
                AppoinmentNo: AppoinmentNos,
                PName: PName,
                Age: Age,
                relation:relation,
                MobileNo:MobileNo ,
                userID: userID ,
            }
        )
        //console.log(Appoinment);
        const datas = await Appoinment.save()
        res.status(200).send(Appoinment)
    } catch (error) {
        res.status(500).send("Error:",error)
        
    }
})

// AppoinmentRouter.patch('/update/:id',async(req,res)=>{
//     const ID = req.params.id
//     const payload = req.body
//     const Appoinment = await Appoinmentmodel.findOne({_id:ID})
//     const userID_in_notes = Appoinment.userID
//     const userID_in_req = req.body.userID
//     try {
//         if(userID_in_notes != userID_in_req){
//             res.status(500).send("You're not authorized")
//         }
//         else{

//             await Appoinmentmodel.findByIdAndUpdate({_id:ID},payload)
//             res.status(200).send("Updated")
//         }
//     } catch (error) {
//         res.status(500).send("something went wrong",error)
//     }
// })
AppoinmentRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    const Appoinment = await Appoinmentmodel.findOne({_id:ID})
    const userID_in_Appoinment = Appoinment.userID
    const userID_in_req = req.headers.userid
    //console.log(userID_in_req);
    try {
        if(userID_in_Appoinment != userID_in_req){
            res.send("You're not authorized")
        }
        else{

            await Appoinmentmodel.findByIdAndDelete({_id:ID})
            res.send("Deleted")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
app.use("/appoinment", AppoinmentRouter);
}
