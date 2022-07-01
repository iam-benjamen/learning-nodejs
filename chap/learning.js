const fs = require("fs");
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) =>{
            if(err) reject('I could not find that file')
            resolve(data);
        });
    });
}   

const writeFilePro = file => {
    return new Promise((resolve, reject) =>{
        fs.writeFile(file, data,  err =>{
            if (err) reject('could not write file')
            resolve('success!')
        });
    });
}

//using async/await

const getDogPic = async () => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        )

        const res2Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        )

        const res3Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        )

        const all= await Promise.all([res1Pro, res2Pro, res3Pro])
        const imgs = all.map (el => el.body.message)
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log("random dog image saved to file!")
    } catch(err) {
        console.log(err);
    }
}

//chaining promises
readFilePro(`${__dirname}/dog.txt`)
    .then(data =>{
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`) 
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    })
    .then(() =>{
        console.log("random image saved to file!")
    })
    .catch(err => {
        console.log(err.message)
    })