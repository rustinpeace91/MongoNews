var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Scraping tools
var request= require("request");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

// Require all models
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// Import routes and give the server access to them.
var articlesRoutes = require("./routes/article");
app.use(articlesRoutes);

// sets view engine to handlebars

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// Connects to mongoDB database
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNews";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("connected to database");
    }
});



// starts the server
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on Port" + PORT);
});
  