// email collector app by Muhammad Saif, 2021 all rights are not totally reserved

// using apps here
const express = require("express");
const app = express();
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");


// express has in built json parser ALPHA.ONE
// express has in built url encoder ALPHA.TWO
// express can use static folders with easy relative pathing ALPHA.THREE
app.use(express.json()); // ALPHA.ONE
app.use(express.urlencoded({
    extended: true
})); // ALPHA.TWO
app.use(express.static("public")); // ALPHA.THREE
mailchimp.setConfig({
    apiKey: "ee645a18750d3ce1b228ebf483ece441-us5",
    server: "us5"
})


// requesting html file at root directory
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

// responding to the requested html file at root directory
app.post("/", function (request, response) {

    const fName = request.body.firstName;
    const lName = request.body.lastName;
    const eAddress = request.body.emailAddress;
    const subscribingUser = {
        firstName: fName,
        lastName: lName,
        email: eAddress
    }
    const url = "https://us5.api.mailchimp.com/3.0/lists/21112c98a4"

    const run = async () => {
        const response = await mailchimp.lists.addListMember("21112c98a4", {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
            }
        }) 
    };



    console.log(fName, lName, eAddress);
    console.log(response.statusCode)

    run();
    if(response.statusCode===200){
        response.send("Thanks for subscribing!")
    }else{response.send("Some error occurred!")}

    // response.send("Thank you for subscribing!")
})


// hosting/listening at local port 3000
app.listen(process.env.PORT || 3000, function () {
    console.log("The server has been started on port 3000, click  CTRL + C to kill off the server!")
})

// API key
// ee645a18750d3ce1b228ebf483ece441-us5

// Audience ID
// 21112c98a4