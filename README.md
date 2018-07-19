# Reuters News Scraper

This app scrapes the Reuters World news section for articles, allows the user to save them to a Mongo Database, and also allows the user to write comments on those articles, which are also saved to a databse and associated with each article through a 1 to many relationship.  The user can also delete saved articles and comments. 

## Getting Started
To install on your local machine, clone the repo, run npm install, then run npm start. Make sure you have MongoDB running.

To visit a live version of the site. go here: https://arcane-hamlet-91719.herokuapp.com/

## Use 
Simply click on the "scrape articles" tab to scrape Reuters for new aticles, save the articles you want. They will now appear on the home page where you can comment on them. You can delete both saved articles and comments.  

This app is built using Mongo DB, Bootstrap 4, Jquery, Axios and the MVC Design pattern. 

![mongo scraper](http://www.isaaclubanko.com/assets/images/globeposter.jpg)

