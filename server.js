// Dependencies //
var express = require("express");
var exphbs  = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Requires all models //
var db = require("./models");

// PORT 3000 //
var PORT = process.env.PORT || 8080;

// MongoDB connection //
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// Initialize Express app //
var app = express();

// Use morgan logger for logging requests //
app.use(logger("dev"));

// Body-parser regarding forms //
app.use(express.urlencoded ({ 
    extended: false 
}));

app.use(express.json());

// Public directory //
app.use(express.static(process.cwd() + "/public"));

// Handlebars //
app.engine("handlebars", exphbs ({ 
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Routes //

// Clears All Routes //
app.get("/delete-all", function(req, res) {
  db.Article.deleteMany({saved: false})
  .then(function(Article) {
  });
});

// Route for getting all Articles from the db //
app.get("/", function(req, res) {
  db.Article.find ({
      saved: false
    })
    .then(function(dbArticle) {
        var hbsobject = {
            articles: dbArticle
        };
        console.log(hbsobject, "objects");
        res.render("index", hbsobject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route that scrapes articles from GameSpot website //
app.get("/scrape", function(req, res) {
    axios.get("https://www.gamespot.com/news/").then(function(response) {
      var $ = cheerio.load(response.data);
      console.log("scraping");
        $("article.media-article").each(function(i, element) {
        var result = {};
  
        result.title = $(this)
          .find("h3.media-title")
          .text();
        result.link = $(this)
          .find("a")
          .attr("href");
        // result.image = $(this)
        //   .find("div.imgflare--river")
        //   .children("img")
        //   .attr("src");
        result.summary = $(this)
          .find("p.media-deck") 
          .text();
             
// Create a new Article from scraping //
        db.Article.create(result, function(err, inserted) {
            if (err) {
            console.log(err);
            } else { 
              console.log(inserted);
          }});    
      });
    });
  });

// Navigates to saved //
app.get("/saved", function(req, res) {
  db.Article.find ({
      saved: false
    })
    .then(function(dbArticle) {
        var hbsobject = {
            articles: dbArticle
        };
        res.render(dbArticle);
        res.render("saved", hbsobject);

    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route to save an article  **// 
app.put("/saved/:id", function(req, res) {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, 
    { saved : true })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//  Route to clear/unsave an article  **//
app.put("/unsave/:id", function(req, res) {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, 
    { saved : false })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for existing notes for specific article //
app.get("/existingNote/:id", function (req, ress) {
  db.Article.findOne({ _id: req.params.id })
  .populate("note")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

// Route for NEW Article NOTE //
app.post("/newNote/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Start the server //
app.listen(PORT, function() {
  console.log("Game Scraper running on port " + PORT + "!");
});