//f156c8173519727260c21bf3f52c1956-us11

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //para usar cosas staticas como mi css y fotos


app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.get("/", function(req, res){ 
    res.sendFile(__dirname + "/signup.html"); 
});

app.post("/", function(req, res){ 
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
})
