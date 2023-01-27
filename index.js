const express = require('express');

const mongoose = require('mongoose');

const methodOverride = require('method-override');


//To load the enviromnent (.env)
require("dotenv").config();

const app = express();

//Specify the default view engine
app.set("view engine","ejs");

//To overwrite http methods
app.use(methodOverride('_method'));


//To decode the post data
app.use(express.urlencoded({extended:true}))

//Get port number and provide default port in case .env file doesnt have aport
const port =  process.env.PORT || 3000;

// const mongoUri= "mongodb+srv://user:333fff333@cluster0.wwutjmv.mongodb.net/" 
const mongoUri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWD}@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}`;
console.log(mongoUri);

//To establish connection 
mongoose.connect(mongoUri,{useNewUrlParser: true}, () => {
    console.log("Establishing connection with Mongo DB: " + process.env.MONGO_DB_NAME
    );
});

//To handle mongoose connection events
const db = mongoose.connection;


//If connected successfully
db.on("connected", () => {
    console.log("Successfully Established connection")
});


//In case of error while connecting
db.on("error", (err) => {
    console.log("Unable to establish connection " + err.message);
});


//If disconnected successfully
db.on("disconnected", () => {
    console.log("Successfully disconnected from MongoDB");
});


app.get("/", (req,res) => {
    res.redirect("/fruits");
});

//Import fruits controller and redirect ro fruits controller
const fruitsController = require("./controllers/fruit_controller.js");
app.use("/fruits",fruitsController);

//const flowersController = require("./controllers/flowers_controller.js");
//app.use("/flowers",flowersController);

//To start the app in browser
app.listen(port, () => {
    console.log("Fruits app is listening on port: " + port);
});







