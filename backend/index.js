var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});


// login
app.post('/login', async function(req, res) {
    try {
        console.log(req.body);
        let id = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE mail = "${req.body.mail}" AND contrasena = "${req.body.contrasena}"`);
        if (id.length === 0) {
            throw new Error("Mail o contraseña incorrecto.");
        } else {
            res.send(id);
        }
    } catch (error) {
        if (error.message == "Mail o contraseña incorrecto.") {
            res.status(500).send(error.message) ;
        } else {
            res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
        }
    }
})

//registro
app.post('/register', async function(req, res) {
    try {
        console.log(req.body) ;
        let existe = await realizarQuery(`SELECT * FROM Usuarios WHERE mail = "${req.body.mail}"`) ;
        if (existe.length > 0) {
            throw new Error("Ya existe este usuario.");
        } else {
            realizarQuery(`
                INSERT INTO Usuarios (nombre, apellido, mail, contrasena, foto_perfil, fecha_registro) VALUES
                ("${req.body.nombre}","${req.body.apellido}","${req.body.mail}","${req.body.contrasena}","${req.body.foto_perfil}","${req.body.fecha_registro}");
            `);
            let id = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE mail = "${req.body.mail}"`);
            res.send(id);
        }
    } catch (error) {
        if (error.message == "Ya existe este usuario.") {
            res.status(500).send(error.message) ;
        } else {
            res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
        }
    }
})

//chats
app.get('/chats', async function(req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT * FROM Chats WHERE `)
    } catch (error) {
        
    }
})