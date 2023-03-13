const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true})); //decimos que bodyparser use este metodo para dar los inputs de la calculadora

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.get("/", function(req, res){ //el metodo get es para obtener todo el index.html
    res.sendFile(__dirname + "/index.html"); //esto me da el path al index.html
})  

app.post("/", function(req, res){ //el metodo post es para actualizar el index con la informacion que queramos
    var num1 = Number(req.body.num1); //.body es la versión ya analizada del http.
    var num2 = Number(req.body.num2); //num2 es porque le dí ese nombre en el index.html
    var result = num1 + num2;
    res.send("The result is " + result)

})
