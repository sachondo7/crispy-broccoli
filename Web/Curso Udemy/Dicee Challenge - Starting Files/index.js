var randomNumber1 = Math.floor((Math.random())*6) + 1;
console.log(randomNumber1);
var randomDiceImage1 = "dice" + randomNumber1 + ".png"; 
var randomImageSource1 = "images/" + randomDiceImage1; //llamamos a la ruta del archivo
var image1 = document.querySelectorAll("img")[0];//selecciono la imagen
image1.setAttribute("src", randomImageSource1); 



var randomNumber2 = Math.floor(Math.random()*6) + 1;
var randomImageSource2 = "images/dice" + randomNumber2 + ".png";
var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randomImageSource2);

if (randomNumber1 > randomNumber2) {
    console.log("player1")
    document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
  }
  else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
  }
  else {
    document.querySelector("h1").innerHTML = "Draw!";
  }