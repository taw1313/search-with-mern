const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
      type: String,
      required: false
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  saveArticle: {
      type: Boolean,
      default: false,
      required: true
  }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;