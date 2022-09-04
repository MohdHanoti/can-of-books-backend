const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    description:String,
    status:String
  
  });
  
  const bookModel = mongoose.model('book', BookSchema);

  module.exports=bookModel;