var express = require('express')
var path = require('path')
var nodeFetch =requier('node-fetch')

const __dirname = path.resolve()
const app = express()
app.set('view engine', 'ejs');

try{
    await app.listen(4000)
    console.log('Servidor arrancado en el puerto 4000')
}catch(err){
    console.err('Fallo al arrancar el servidor:',err)
}

app.get("/" , async (req,res)=>{
    const url = 'https://rickandmortyapi.com/api/character'
    const respuesta = await nodeFetch(url)
    const datosJson = await respuesta.json()
    console.log(datosJson)

})