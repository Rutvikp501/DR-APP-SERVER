//"use strict";

// Loading default app
const { app } = require("../app.js");


app.get("/", async (req, res) => {
  //console.log("Welcome to server !!!");
  res.send('welcome To server')
  //res.json({ message: "Welcome to server !!!" });
});


// Route urls
require("./users.js")(app);
require("./Appoinment.js")(app);

