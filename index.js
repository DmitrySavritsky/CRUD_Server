const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const userRouter = require("./routes/users.route.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public",express.static("public"));
app.use("/users",userRouter);

app.listen(port, () =>{
    console.log(`Application is working on ${port} port`);
});