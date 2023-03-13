

var numberOfDrums = document.querySelectorAll(".drum").length;
console.log(numberOfDrums);

for (var i = 0; i<numberOfDrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function (){ //ponemos querySelectorAll porque queremos recorrer todos los botones!
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
        

    });
}

document.addEventListener("keydown", function(evento){
    makeSound(evento.key);
    buttonAnimation(evento.key);
})

function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
        break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
        break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
        break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
        break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
        break;
        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
        break;
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
        break;
    
        default: console.log(key);
    }
}

function buttonAnimation(current_key){
    var current_button = document.querySelector("." + current_key); //buscamos por clase de la tecla
    current_button.classList.add("pressed"); //le agregamos la clase pressed de css 
    setTimeout(function(){
        current_button.classList.remove("pressed");
    }, 100);
}



