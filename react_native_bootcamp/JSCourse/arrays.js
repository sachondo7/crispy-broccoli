let hobbies = ["Sports", "Cooking"];


for (let hobby of hobbies) {
    console.log(hobby);
}

//Equivalent to:
for (let i = 0; i < hobbies.length; i++) {
    console.log(hobbies[i]);
}

let hobbiesSubset = hobbies.slice(1);
let filteredArray = hobbies.filter(hobby => {
    return hobby === "Sports";
});

// A los arrays se les puede agregar elementos aunq sean declarados como constantes, pues funciona como un puntero
const hobbies2 = ["running", "swimming", "reading"];
hobbies2.push("programming");

//Lo mismo pasa con los objetos
const object = {
    name: "Sebastian",
    age: 22
};

object.hobbie = "programming";
console.log(object);