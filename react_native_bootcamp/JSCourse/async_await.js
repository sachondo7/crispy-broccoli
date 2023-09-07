// A promise is an object that eventually produces a value of an asynchronous operation


// An async operation is an operation that takes some time to complete, 
    //it allows other operations to keep executing while it is being completed

const getUser = username => {
    const API_URL = "https://api.github.com/users/${username}";
    return fetch(API_URL).then((value) => value.json())
}; 

getUser("openai").then((val) => console.log(val));

//Ahora con async await

const getUser2 = async username => {
    const API_URL = "https://api.github.com/users/${username}";
    const response = await fetch(API_URL);
    const data = response.json();
};

getUser2('openai').then((val) => console.log(val));

//Ahora con promesas
const getUser3 = username => {
    return new Promise((resolve, reject) => {
        const API_URL = "https://api.github.com/users/${username}";
        fetch(API_URL)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        }
    );
};
