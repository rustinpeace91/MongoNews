//***************************************************************************************************
// ROUTES
//***************************************************************************************************

var express = require("express");
var db = require("../models");
var router = express.Router();


// retrieves all articles from the DB and renders them to the homepage
router.get("/" , function(req,res){
    // Using our character model, "find" every character in our db
db.Article.find({})
.then(function(data) {
    // If any articles are found, send them to the client
    var hbsObject = {
        articles:data
    }
    res.render("index", hbsObject)
})
.catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
});

});



// Route for getting all articles from the db
router.get("/api/articles", function(req, res) {
// Using our character model, "find" every character in our db
db.Article.find({})
    .then(function(data) {
    // If any articles are found, send them to the client
    res.json(data);
    })
    .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
    });
});



// retrieves all the articles of a certain ID (not in use yet)
router.get("/api/articles/:id", function(req,res){
console.log(req.params.id)
db.Article.find({_id : req.params.id})
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    });
});



router.post("/api/articles", function(req, res) {
// Create a new characterin the database
db.Article.create(req.body)
    .then(function(data) {
    // If the Library was updated successfully, send it back to the client
    res.json(data);
    })
    .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
    });
});

router.delete("/api/articles/:id", function(req,res){

db.Article.deleteOne({_id : req.params.id})
    .then(function(data){
        res.json(data);

    })
    .catch(function(err){
        res.json(err);
    });
});


//  END ROUTES

module.exports = router;