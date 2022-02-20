// ASync JS is a mechanism for ensuring non-blocking methods of code.
// It ensures that the sequence of code execution is not delayed due to some code that takes time. 

//Fetch API

fetch('todos/luigi.json').then((response) => {
    console.log('resolved', response);
}).catch((err) => {
    console.log('rejected', err);
});

// Async and await

const getTodos = async () => {
    const response = await fetch('todos/luigis.json');
    if(response.status !== 200){
        throw new Error('cannot fetch data')
    }

    const data = response.json();
    return data;

}

getTodos()
    .then(data => console.log('resolved', data))
    .catch(err => console.log('error!', err.message));