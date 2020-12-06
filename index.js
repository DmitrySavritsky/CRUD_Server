const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const userRouter = require("./routes/users.routes.js");

app.use(bodyParser.json());
app.use("/users",userRouter);
app.listen(port, () =>{
    console.log(`Application is working on ${port} port`);
});