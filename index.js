const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const userRouter = require("./routes/users.route.js");
const photoRouter = require("./routes/photos.route.js");
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/users";

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/public",express.static("public"));
app.use("/users",userRouter);
app.use("/photos",photoRouter);

app.listen(port, () =>{
    console.log(`Application is working on ${port} port`);
});