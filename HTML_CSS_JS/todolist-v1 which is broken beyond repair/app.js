// using apps here
const express = require("express");
const app = express();
const https = require("https");

var items = ["Buy Meat", "Cook Meat", "Eat Meat"];
var workItems = ["Do Code", "Read Books"]

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// GET statement
app.get("/", function (req, res) {
    var dates = new Date();
    // Settings for toLocaleDateString
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = dates.toLocaleDateString("en-US", options)

    res.render("lists", {
        ListItem: day,
        addTask: items,
        items: items,
        route: "/",
        arrayName:"items.length"
    });
})
// POST request
app.post("/", function (req, res) {
    addTask = req.body.addTask;
    items.push(addTask);
    res.redirect("/");
})
app.get("/work", function (req, res) {

    var dates = new Date();
    // Settings for toLocaleDateString
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
     var day = dates.toLocaleDateString("en-US", options)


    res.render("lists", {
        ListItem: "Work List",
        addTask: workItems,
        day: day,
        route:"/work",
        arrayName:"workItems.length"

    })
})
app.post("/work", function (req, res) {
    addTask = req.body.addTask;
    workItems.push(addTask);
    res.redirect("/work")
})




// Listening on port 3000
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000, CTRL + C to exit the nodemon command line interface");
})