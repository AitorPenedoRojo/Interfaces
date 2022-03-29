var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'))


console.log("hello world")

app.get('/',(req,res)=>{
    res.send('Hola que tal te respondo desde el servidor')
})

app.get('/fecha',(req,res)=>{

    let fecha = new Date()

    res.send('La fecha es '+fecha)

})

app.get('/lista',(req,res)=>{

    res.send(`
    <html>
        <body>
            <ul>
                <li>Pera</li>
                <li>Limon</li>
                <li>Manzana</li>
            </ul>
        </body>
    </html>
    `)
})

app.get('/dameJson',(req,res)=>{
    
    let objetoAlumno={
        nombre:'Aria',
        edad:'24'
    }

    res.json(objetoAlumno)
})

app.get('/formulario',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

module.exports = app
