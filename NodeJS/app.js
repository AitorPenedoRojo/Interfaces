var express = require('express')
var app = express()

console.log("hello world")

app.get('/',(req,res)=>{
    res.send('Hola que tal te respondo desde el servidor')
})

app.get('/fecha',(req,res)=>{

    let fecha = new Date()

    res.send('La fecha es '+fecha)

})

module.exports = app
