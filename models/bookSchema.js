const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const bookSchema = Schema({
  title:   String,
  author:  String,
  text:    String,
  total:   Number
});


module.exports = mongoose.model('Libro', bookSchema);
