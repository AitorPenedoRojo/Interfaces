import express from "express"
import path from 'path'
import nodeFetch from 'node-fetch'

const __dirname = path.resolve()
const app = express()
app.set('view engine', 'ejs');

app.get('/personajes', async (req,res) => {
    const url = "https://rickandmortyapi.com/api/character"
    const respuesta = await nodeFetch(url)
    const jsonPuro = await respuesta.json()
    const datosJson = jsonPuro['results']


    let objFinal = {
        nombre : datosJson['name'],
        foto :datosJson['image'],
        id :datosJson['id'],
        genero :datosJson['gender']
    }

})

app.get('/personajes/:id', async (req,res) => {
    const {id} = req.params
    const url = "https://rickandmortyapi.com/api/character/"+id
    const respuesta = await nodeFetch(url)
    const datosJson = await respuesta.json()

    let objFinal = {
        nombre : datosJson['name'],
        foto :datosJson['image'],
        id :datosJson['id'],
        status :datosJson['status'],
        genero :datosJson['gender']
    }

    res.json(objFinal)
    

})

app.get('/count', async (req,res) => {
    const {id} = req.params
    const url = "https://rickandmortyapi.com/api/character/"
    const respuesta = await nodeFetch(url)
    const datosJson = await respuesta.json()

    res.json(datosJson['info']['count'])

})

try{
    await app.listen(4000)
    console.log('Servidor arrancado en el puerto 4000')
}catch(err){
    console.err('Fallo al arrancar el servidor:',err)
}