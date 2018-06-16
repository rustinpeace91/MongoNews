//***************************************************************************************************
// ROUTES
//***************************************************************************************************

var express = require("express");
var db = require("../models");
var router = express.Router();
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");


// retrieves all articles from the DB and renders them to the homepage
router.get("/" , function(req,res){
    // Using our character model, "find" every character in our db
db.Article.find({})
.populate("comments")
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



router.get("/scrape", function(req,res){
    console.log("yeah");
    // request.get("https://www.reuters.com/news/world").then((response)=> {
    //     res.json(response)
    // });
    var hbsObject = {
        scraped: []
    }

    axios.get("https://www.reuters.com/news/world").then((response) => {
        var $ = cheerio.load(response.data);

        $(".item_AanJv").each(function(i, element){
            var result = {};
            result.id = i;
            result.title = $(this).find("h2.headline_ZR_Fh a").text();
            result.link = $(this).find("h2.headline_ZR_Fh a").attr("href");
            result.summary = $(this).find("p.lede_Wa-ek").text();
 

            hbsObject.scraped.push(result);
            // console.log(hbsObject.scraped[i]);
        })
        console.log(hbsObject.scraped);

        // console.log(hbsObject);
        res.render("scrape", hbsObject);
    })
});

// retrieves all the articles of a certain ID (not in use yet)
router.get("/api/articles/:id", function(req,res){
db.Article.find({_id : req.params.id})
    .populate("comments")
    .then(function(data){
        res.json(data);
        console.log(data);
    })
    .catch(function(err){
        res.json(err);
    });
});

router.delete("/api/comments/:id", function(req,res){

    db.UserComment.deleteOne({_id : req.params.id})
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


router.post("/api/articles/:id", function(req, res) {
    // Create a new characterin the database
    db.UserComment.create(req.body)
        .then(function(data) {
            return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: { comments: data._id }}, { new: true })
 
        }).then(data => {
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