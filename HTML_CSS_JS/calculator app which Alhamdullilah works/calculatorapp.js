const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// BELOW THIS IS NUMBER ADDITION CALCULATOR

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
})


app.post("/index.html", function(req, res){
var num1 = Number(req.body.num1);
var num2 = Number(req.body.num2);
var results = num1 + num2 ;

res.send("The addition of the two numbers is "+results);
})


// BELOW THIS IS BMI CALCULATOR WEIGHT BY HEIGHT SQUARED

app.get("/bmicalc", function(req, res){
    res.sendFile(__dirname+"/bmicalc.html");
})
app.post("/bmicalc.html", function(req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var heightSquared = Math.pow(height, 2);

    var BMI = Math.floor(weight/heightSquared);

    res.send("Your BMI is approximately "+ BMI);
})


app.listen(3000, function(){
    console.log("Server started at port: 3000 , stop the server with CTRL + C in the terminal");
})