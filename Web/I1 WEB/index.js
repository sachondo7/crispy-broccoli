document.getElementById("inputVacuno").disabled = true;
document.getElementById("inputCerdo").disabled = true;
document.getElementById("inputPollo").disabled = true;
document.getElementById("inputLonganizas").disabled = true;
document.getElementById("inputVeggie").disabled = true;
document.getElementById("inputTot").disabled = true;

var numberOfInputs = document.querySelectorAll(".titAzul").length;

const numberOfPeople = document.getElementById("inputPersonas");
const numberOfVeggiePeople = document.getElementById("inputVeggie");
const gramsOfVacuno = document.getElementById("inputVacuno");
const gramsOfCerdo = document.getElementById("inputCerdo");
const gramsOfPollo = document.getElementById("inputPollo");
const gramsoFLonganizas = document.getElementById("inputLonganizas");

const buttonCalcular = document.getElementById("botonCalcular");
console.log(buttonCalcular);



for (var i = 0; i<numberOfInputs; i++) {
    document.querySelectorAll(".titAzul")[i].addEventListener("click", function(){
    var buttonInnerHTML = this.innerHTML;
    changeColor(buttonInnerHTML);
    ableInput(buttonInnerHTML);
    })
}



function changeColor(innerText){
    var current_button = document.querySelector("#" + innerText);
    current_button.classList.add("cambioBoton");
}

function ableInput(text){
    //var current_input = document.querySelector("#input" + text);
    document.getElementById("input"+text).disabled = false; 
}

function price() {
    //var price = numberOfPeople * ((gramsOfCerdo * 10) + (gramsOfPollo * 10) + (gramsOfVacuno *18) + (gramsoFLonganizas *10))
    //price += 150 * numberOfVeggiePeople
    var presio = numberOfPeople.value;
    document.getElementById("inputTot").value = presio;
    console.log(presio);

}

buttonCalcular.addEventListener("click", price());
