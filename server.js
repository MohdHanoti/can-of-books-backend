'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookModel =require('./schema');


const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;





mongoose.connect('mongodb://localhost:27017/Book', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB



async function seedData(){
  const firstBook= new bookModel({
    title: 'A Song of Ice and Fire',
    description:"A  Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin.",
    status:"not finished"
  })
  const secondBook= new bookModel({
    title: 'The lord of the rings',
    description:"The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien.",
    status:"finished"
  })
  const thirdBook= new bookModel({
    title: 'The Great Gatsby',
    description:" Midwestern war veteran finds himself drawn to the past and lifestyle of his millionaire neighbor",
    status:"finished"
  })
  

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}

  // seedData();

// http://localhost:3001/
server.get('/',(req,res)=>{
  res.send('hello from the home route');
})


// http://localhost:3001/test
server.get('/test', (req, res) => {

  res.send('test request received');

})



// http://localhost:3001/Books
server.get('/Books',getBookHandler);

function getBookHandler(req,res){
  bookModel.find({},(err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log(result);
      res.send(result);
    }
  } ) 
}

// http://localhost:3001/*
server.get('/*',(req,res)=>{
  res.status(404).send('404 page not found');
})

server.listen(PORT, () => console.log(`listening on ${PORT}`));
