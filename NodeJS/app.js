var express = require('express')
var mysql = require('mysql')
var con = mysql.createConnection({
    host: "127.0.0.1",
    port: "3308",
    user: "root",
    password: "Ad1234",
    database : 'botanica'

});
con.connect(function (err) {
    if (err) throw err;
    console.log("Conexión con la BD!");
});

var app = express()
var port=process.env.PORT || 3678
var moment = require('moment')
app.set('view engine','ejs')

//O pug o ejs, no los dos a la vez
//app.set('view engine','pug')

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded())

app.use(express.json())


console.log("hello world")

app.use((req,res,next)=>{

    let ip = req.ip

    let fecha= new Date()

    console.log(`Se ha conectado la ip: ${ip} ${fecha}`)

    next();

})

app.post("/login", function(req,res){

    //Los datos llegan en el body de la peticion

    var texto = req.body.user+" "+req.body.pass

    res.json({name:texto})
})

const middleware = (req,res,next)=>{

    moment.locale('es')
    req.time = moment().format('DD MMMM YYYY HH:mm')

    next()
}

app.get('/',(req,res)=>{
    res.render("index")
})


app.get('/fecha',(req,res)=>{

    let fecha = new Date()

    res.send('La fecha es '+fecha)

})

//Web html
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

//Monta un json
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

app.get('/json',(req,res)=>{
    let response;
    if(process.env.MESSAGE_STYLE ==="uppercase"){
        response ="Hello json".toUpperCase
    
    }else{
        response="Hello json"
    }
    res.json({message:response})
})

app.get("/fechaYHora", middleware,(req,res)=>{

    res.send({
        time:req.time
    })
})

//Meter parametros en la barra de busqueda
app.get("/:numero/cuadrado",(req,res)=>{

    //let numero = req.params.numero

    const{numero}=req.params

    let n = parseFloat(numero)**2

    res.send(n.toString())
})

app.get("/saluda/:nombre",(req,res)=>{

    const{nombre} = req.params

    res.send(nombre.toUpperCase())
})

//https://localhost:4000/datos_personales?nombre=angel&apellidos=gonzalez
app.get("/datos_personales", function(req,res){

    //var nombre = req.query.nombre

    //var apellidos = req.query.apellidos

    var{nombre,apellidos} =req.query

    res.json({

        name: `${nombre} ${apellidos}`
    })
})

app.get("/pagina_pug",(req,res)=>{
    res.render("index1",{nombre:"Aria"})
})

app.get("/pagina_pug/:nombre", (req,res)=>{
    let n = req.params.nombre

    res.render("index1",
    {nombre:n.toUpperCase()})
})

app.get("/pagina_ejs",(req,res)=>{
    res.render("index2",{nombre:"Aria"})
})

app.get("/pagina_ejs/:nombre", (req,res)=>{
    let n = req.params.nombre

    res.render("index2",
    {nombre:n.toUpperCase()})
})

//Bases de datos

app.get("/baseDeDatos", (req,res)=>{
    const query = 'select * from flor'

    con.query(query, function(err, result){
        if(err) throw err;
        res.send(result)
    })
})

app.get('/baseDeDatos/ejs', (req, res) => {
    const query = 'select * from flor'
    con.query(query, function (err, result) {
        if (err) throw err;
        res.render('index2', {listaFlores: result});
      });
})


app.listen(port,()=>{
    console.log("API REST funcionando en http://localhost:"+port)
})


module.exports = app
