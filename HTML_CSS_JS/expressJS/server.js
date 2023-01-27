const express = require("express");
const app = express();


app.get("/", function(req ,res){
    res.send("This is workinng, the server is connected gg");
})
app.listen(3000 , function(){
    console.log("Server has started on port 3000, click CTRL + C to exit the server listener GG");
})