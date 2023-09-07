//Destructuring se usa para extraer elementos de un array u objeto y almacenarlos en variables de manera mas sencilla
const person = {
    name: 'John',
    age: 22,
    occupation: 'student',
};

//const name = person.name;
//const age = person.age;
//const occupation = person.occupation;

//Esto es equivalente a: 

const { name, age, occupation } = person;

//Mucho mas sencillo, no?

//Tambien se puede hacer con arrays
const numbers = [1, 2, 3];

const [num1, num2, num3] = numbers;