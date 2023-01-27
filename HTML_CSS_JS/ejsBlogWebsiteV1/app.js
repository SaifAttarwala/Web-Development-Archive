// lodash uses _ as the variable usually, can change it but should change all occurences

// params is :postTitle

// _.lowerCase is of Lodash library method

const express = require("express");
const ejs = require("ejs");
const _ = require('lodash')

const homeStartingContent = "Creating solutions you didn't knew you needed.";
const aboutContent = "Llama Space INC. is a multi-national corporate brand, domain to large firms which create solutions and products to ensure the luxury and ease of people in their day to day lives. Founded in 2017, by Mirza Akif Ayaz Baig. The company currently has only four board members and they actively work for the greater good!";
const contactContent = "Contact staff at saifattarwala@gmail.com";

let posts = [];


const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/home", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  })
})
app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
  })
})
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  })
})
app.get("/compose", function (req, res) {
  res.render("compose")
})
app.get("/post/:postTitle", function (req, res) {

  const requestedTitle = _.lowerCase([req.params.postTitle]);

  posts.forEach(function (post) {

    const storedData = _.lowerCase([post.postTitle]);

    if (requestedTitle === storedData) {
      res.render("post", {
        title: post.postTitle,
        content: post.postContent,
      })
    }
  })
});
app.post("/compose", function (req, res) {

  const post = {
    postTitle: req.body.blogPostTitle,
    postContent: req.body.blogPostContent,
  }
  posts.push(post);
  res.redirect("/home");
});

app.listen(3000, function () {
  console.log("Server started on port 3000, click CTRL + C to exit the server");
});