var express = require("express");
var mysql = require("mysql");
var app = express(); //ejecuta el constuctor

app.use(express.json());
 
//configurar conexion a MySql
var conenexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pw1011'
});
 
//Probamos la conexion
conenexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conectado a la base de datos")
    }
});
 
app.get("/",function(req,res){
    res.send("<h1>Ruta de inicio principal<h1/>")
});
 
app.get('/api/alumnos',(req,res) => {
    conenexion.query("select * from alumnos",(error,filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
})

app.get('/api/alumnos/:id',(req,res) => {
    conenexion.query("select * from alumnos where ncontrol = ? limit 1",[req.params.id],(error,fila) =>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
});

//Dar de alta un alumno
app.post('/api/alumnos',(req,res)=>{
    let data = {ncontrol: req.body.nc,
                nombre: req.body.nom,
                carrera: req.body.car,
                estatus: req.body.est}
    let sql = "INSERT INTO alumnos SET ?";
    conenexion.query(sql,data,function(error,results){
        if(error){
            throw error
        }
        else{
            res.send(results)
        }
    })
});

//Actualizar datos de un alumnos
app.put('/api/alumnos/:id',(req,res)=>{
    let nc = req.params.id;
    let nom = req.body.nom;
    let car = req.body.car;
    let est = req.body.est;
    let sql =" UPDATE alumnos SET nombre=?, carrera=?, estatus=? WHERE ncontrol=?"
    conenexion.query(sql,[nom,car,est,nc], function(error,results){
        if(error){
            throw error;
        }
        else{
            res.send(results);
        }
    })
})

//Borrar un alumno
app.delete('/api/alumnos/:id',(req,res)=>{
    conenexion.query("DELETE FROM alumnos WHERE ncontrol = ?", [req.params.id],function(error,filas){
        if(error){
            throw error;
        }
        else{
            res.send(filas);
        }
    })
});
 
//Crear el servidor
app.listen("3000",function(){
    console.log("Servidor en el puerto 3000 ")
});