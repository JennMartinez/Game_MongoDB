var mongoose = require("mongoose");
var Note = require("./Note");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  link: {
    type: String,
    required: true
  },
  
  // image: {
  //   type: String,
  //   required: true
  // },

  summary: {
    type: String,
    required: true
  },

  saved: {
    type: Boolean,
    default: false
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

// Exports Article //
module.exports = Article;