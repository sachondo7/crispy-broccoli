
const name = "Sebastian";
let age = 22;
let hasHobbies = true;

console.log(name);

function whoIsThis(namem, age) {
    return "My name is " + name + " and I am " + age + " years old";
}

// Funcion normal vs arrow function
function suma(num1, num2) {
    return num1 + num2;
}

// Arrow function
const suma2 = (num1, num2) => { num1 + num2 };

console.log(whoIsThis(name, age));