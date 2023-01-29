const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res){
    console.log(req.body.cityName);

    const apiKey = "INSERT API KEY";
    const cityName = req.body.cityName;
    const unitType = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+unitType;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            //the data is from openweather api and is parsed (changed from hexadecimal to json)
            const weather = JSON.parse(data); 
            const temp = weather.main.temp;
            const weatherIcon = weather.weather[0].icon;
            const description = weather.weather[0].description;
            const imageURL = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
            //console.log(weather);
            res.write("<html><h1><strong>Weather API made by Saif; Powered by OpenWeatherAPI.</strong></h1></html>")
            res.write("<html><h1>The temperature in "+cityName+" is "+temp+ " and it is "+description+" there!</h1></html>");
            res.write("<img src='"+imageURL+"'>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server started at port 3000. Click CTRL + C to kill off server!");
})



