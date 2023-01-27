// 26 september 2021, alhamdullillah this thing ain't broken. future me, im typing with one hand and using other for tea!
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Creating solutions you didn't knew you needed.";
const aboutContent = "Llama Space INC. is a multi-national corporate brand, domain to large firms which create solutions and products to ensure the luxury and ease of people in their day to day lives. Founded in 2017, by Mirza Akif Ayaz Baig. The company currently has only four board members and they actively work for the greater good!";
const contactContent = "Contact staff at saifattarwala@gmail.com";

const app = express();

// Mongoose connection
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

// Mongoose schema creation
const blogSchema = {
  title: String,
  content: String
};
// Mongoose model creation
const Post = mongoose.model("Post", blogSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  })
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postID", function (req, res) {
  const requestedID = req.params.postID

  Post.findById(requestedID, function(err, post){
      res.render("post",{
        title:post.title,
        content:post.content
      })
    })
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});