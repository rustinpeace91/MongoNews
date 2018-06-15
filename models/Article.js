var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required:true,
        //it will not add duplicate articles to the saved articles database 
        unique: true
    },
    link: {
        type: String,
        required:true
    },
    summary: {
        type: String
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserComment"
        }
    ]

});

// This creates our model from the above schema, using mongoose's model method

var Article = mongoose.model("Article", ArticleSchema);

// Export the Character sheet model
module.exports = Article;
