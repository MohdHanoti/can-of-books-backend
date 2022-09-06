"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookModel = require("./schema");

const server = express();
server.use(cors());

// access req.body
server.use(express.json());

const PORT = process.env.PORT || 3001;

// mongoose.connect("mongodb://localhost:27017/Book", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }); // 1 - connect mongoose with DB

mongoose.connect('mongodb://MohdHanoti1:1234@ac-teztbfx-shard-00-00.isrq3td.mongodb.net:27017,ac-teztbfx-shard-00-01.isrq3td.mongodb.net:27017,ac-teztbfx-shard-00-02.isrq3td.mongodb.net:27017/?ssl=true&replicaSet=atlas-m7d07c-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB

async function seedData() {
  const firstBook = new bookModel({
    title: "A Song of Ice and Fire",
    description:
      "A  Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin.",
    status: "not finished",
  });
  const secondBook = new bookModel({
    title: "The lord of the rings",
    description:
      "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien.",
    status: "finished",
  });
  const thirdBook = new bookModel({
    title: "The Great Gatsby",
    description:
      " Midwestern war veteran finds himself drawn to the past and lifestyle of his millionaire neighbor",
    status: "finished",
  });

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}

// seedData();

//ROUTES
// http://localhost:3001/
server.get("/", (req, res) => {
  res.send("hello from the home route");
});
// http://localhost:3001/test
server.get("/test", (req, res) => {
  res.send("test request received");
});
// http://localhost:3001/Books
server.get("/Books", getBookHandler);

// http://localhost:3001/addBook
server.post("/addBook", addBookHandler);

// http://localhost:3001/deleteBook
server.delete("/deleteBook/:id", deleteBookHandler);

// http://localhost:3001/updateBook
server.put("/updateBook/:id", updateBookHandler);

function getBookHandler(req, res) {
  bookModelDev(req, res);
}

async function addBookHandler(req, res) {
  console.log(req.body);
  const { Title, Description, Status } = req.body;

  await bookModel.create({
    title: Title,
    description: Description,
    status: Status,
  });

  bookModelDev(req, res);
}

function deleteBookHandler(req, res) {
  const bookId = req.params.id;
  bookModel.deleteOne({ _id: bookId }, () => {
    bookModelDev(req, res);
  });
}

function bookModelDev(req, res) {
  bookModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
}
function updateBookHandler(req, res) {
  const Id = req.params.id;
  console.log(Id);
  const { Title, Description, Status } = req.body;
  console.log(Title);
  bookModel.findByIdAndUpdate(
    Id,
    {
      title: Title,
      description: Description,
      status: Status,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        bookModel.find({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(result);
            res.send(result);
          }
        });
      }
    }
  );
}

// http://localhost:3001/*
server.get("/*", (req, res) => {
  res.status(404).send("404 page not found");
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
