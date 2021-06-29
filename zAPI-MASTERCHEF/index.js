/*const Math = require('./Math.js');

const {restar} = require('./Math.js');

console.log(Math.sumar(150,50));

console.log("Resta: " + restar(150,50));*/

const express = require('express');

const PORT = 3000;

const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>Hola Mundo</h1>");
});

app.listen(PORT, ()=>{
    console.log("Servidor escuchando en el puerto " + PORT);
});
