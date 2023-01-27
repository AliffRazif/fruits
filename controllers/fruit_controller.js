const express = require('express');
const router = express.Router();



//Import the fruit model
const fruit = require('../models/fruit_schema')



//To test our application route


//To load the new fruits form
router.get("/new", (req,res) => {
    res.render("new.ejs");
});

//To create data
router.post('/', (req,res) => {
//Check if the checkbox is checked or not
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
      fruit.create(req.body,(err,createdFruit) => {
        if(err){
            console.log(err)
        } else {
            // res.send(createdFruit);
            res.redirect('/fruits');
        }
      });
        // res.send(req.body)
});

//Create route for index fruits
router.get("/", (req,res) => {
    //To get data from MongoDB
    fruit.find({}, (err,fruitDetails) => {
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{fruits:fruitDetails});
        }
    })
});



//Create seed route
router.get("/seed", (req,res) => {
    fruit.insertMany([
        {
            name:'Grapefruit',
            color: 'pink',
            readyToEat: true,
        },
        {
            name:'Grape',
            color: 'green',
            readyToEat: true,
        },
        {
            name:'Rasberry',
            color: 'red',
            readyToEat: true,
        },
    ],(err,success) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/fruits");
        }
    })
   
});

//Route to show fruit details based on id
router.get("/:id", (req,res) => {
    //To get fruit details from mongodb
    fruit.findById(req.params.id, (err,foundFruit) => {
        if(err){
            console.log(err);
        }else{
            console.log(foundFruit);
            // res.send(foundFruit);
            res.render("view.ejs", {fruit: foundFruit});
        }
    });

});


//TO delete fruit details
router.delete("/:id", (req,res) => {
    // res.send("Deleting....")
    fruit.findByIdAndDelete(req.params.id, (err,success) => {
        if(err){
            console.log(err);
        }else{
            //Redirect back to index page
            res.redirect("/fruits");
        }
    });
});


//To update the fruit details
router.put("/:id", (req,res) => {
    req.body.readyToEat = req.body.readyToEat === 'on'
    fruit.findByIdAndUpdate(req.params.id,req.body,(err,updatedFruit) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/fruits");
        }

    })
})


//To edit the fruit details
router.get("/:id/edit", (req,res) => {
    fruit.findById(req.params.id,(err, foundFruit) => {
        if(err){
            console.log(err);
        }else{
            res.render("edit.ejs",{fruit: foundFruit});
        }
    })
})

module.exports = router;