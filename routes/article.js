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
var fs = require('fs');
var dummydata = require("../public/data/dummydata.json");

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
    //  console.log(hbsObject.articles[1].comments[0]);
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
    // console.log("yeah");
    // request.get("https://www.reuters.com/news/world").then((response)=> {
    //     res.json(response)
    // });
    var hbsObject = {
        scraped: []
    }

    // ==================== WEB SCRAPER CODE =================================== //

    axios.get("https://www.reuters.com/news/world").then((response) => {
        var $ = cheerio.load(response.data);

        $(".ImageStoryTemplate_image-story-container").each(function(i, element){
            var result = {};
            result.id = i;
            result.title = $(this).find("h2.FeedItemHeadline_full a").text();
            result.link = $(this).find("h2.FeedItemHeadline_full a").attr("href");
            result.summary = $(this).find("p.FeedItemLede_lede").text();
 

            hbsObject.scraped.push(result);
        })
        // console.log(hbsObject.scraped);

        res.render("scrape", hbsObject);
    })

    // ===================== END WEB SCRAPER CODE ================================= //

    // //=====================DUMMY DATA VERSION==================================== //

    // function setData(hbsObject, dummyData, func) {
    //     hbsObject.scraped = dummyData.scraped;
    //     func(res, hbsObject);
    // };
    // setData(hbsObject, dummydata, function(res, hbsObject){
    //     res.render("scrape", hbsObject);
    // });  

    // //=====================END DUMMY DATA VERSION==================================== //
});


// retrieves all the articles of a certain ID (not in use yet)
router.get("/api/articles/:id", function(req,res){
db.Article.find({_id : req.params.id})
    .populate("comments")
    .then(function(data){
        res.json(data);
        // console.log(data);
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
// Create a new  article in  the database
db.Article.create(req.body)
    .then(function(data) {
    // If the article was updated successfully, send it back to the client
    res.json(data);
    })
    .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
    });
});


router.post("/api/articles/:id", function(req, res) {
    // Create a new user comment in  the database
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