const nodemailer = require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")

const Accountcreation= fs.readFileSync(path.join(__dirname,"../views/email/logincreate.hbs"), "utf8")

var MailTransport  = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
          user: 'rutvikpatil.501@gmail.com',
          pass: 'Rutvik@501@Patil'
      },
      
    });


      
  
  function mailsend(sender,htmlToSend,title)
  {
      const mailOptions = {
          from: "rutvik.gainn@gmail.com",
          to: sender,
          subject: title,
          html: htmlToSend
        }
      
       return MailTransport.sendMail(mailOptions, function(error, response) {
          if (error) {           
            console.log(error)
            //return false;
          } else {
            console.log("Successfully sent email.")
           // return true
          }
        })
  }
  
  
async function createmail(name,login,password,sender)
{
  const template = handlebars.compile(Accountcreation)
  const htmlToSend = template({name:name,login:login,password:password,name:name})
  let title="Account Details";
  mailsend(sender,htmlToSend,title);
 
}

module.exports = {
    createmail:createmail,   
  };
  
// exports.mail = async(req,res)=>{
//     // console.log("Dhavaldfdfd");
//     createmail("Rutvik","RP5011","Rp-12345","patilrutvik501@gmail.com")
//    }