//Para copiar un array se usa el spread operator representado por 3 puntos
const hobbies = ["sports", "cooking"];
const coppiedHobbies = [...hobbies];

//Lo contrario al spread operator es el rest operator, que se usa para agrupar elementos en un array
const toArray = (...args) => args;
console.log(toArray(1, 2, 3, 4, 5));