const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "gestion_empleados"
});

app.post("/create",function(req, res){
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,apellido,edad, pais,cargo,anios) VALUES(?,?,?,?,?,?)',[nombre,apellido,edad,pais,cargo,anios],
        function(err, result){
            if(err)
            {   
                console.log(err);
            }else
            {
                res.send(result);
            }
        }
    );
});

app.get("/empleados",function(req, res){
    
    db.query('Select * From empleados',
        function(err, result){
            if(err)
            {   
                console.log(err);
            }else
            {
                res.send(result);
            }
        }
    );
});
app.put("/update",function(req, res){
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,apellido=?,edad=?, pais=?,cargo=?,anios=? WHERE id=?',[nombre,apellido,edad,pais,cargo,anios,id],
        function(err, result){
            if(err)
            {   
                console.log(err);
            }else
            {
                res.send(result);
            }
        }
    );
});
app.delete("/delete/:id",function(req, res){
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
        function(err, result){
            if(err)
            {   
                console.log(err);
            }else
            {
                res.send(result);
            }
        }
    );
});

app.listen(3001, function(){
    console.log('Corriendo en el puerto 3001');
});

