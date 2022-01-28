const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const { Http2ServerResponse } = require("http2");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req,res) {
    const name = req.body.inputName;
    const genderUrl = "https://api.genderize.io/?name=" + name;

    https.get(genderUrl,function(responseGender) {
        responseGender.on("data", function (data) {
            const genderData = JSON.parse(data);
            const gender = genderData.gender;
            if(gender === 'male') {
                res.sendFile(__dirname + "/pages/male.html");
            } else {
                res.sendFile(__dirname + "/pages/female.html");
            }
        })
    })
})


app.listen(3000, function() {
    console.log("Server is up and running.");
})