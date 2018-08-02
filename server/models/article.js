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
    default: Date.now,
    required: true
  },
  saveArticle: {
      type: Boolean,
      default: false,
      required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'note'
  }]
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;