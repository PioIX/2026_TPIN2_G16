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
            res.send(0)
        } else {
            res.send(id[0]);
        }
    } catch (error) {
        res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
        res.send(-1);
    }
})

//registro
app.post('/register', async function(req, res) {
    try {
        console.log(req.body) ;
        let existe = await realizarQuery(`SELECT * FROM Usuarios WHERE mail = "${req.body.mail}"`) ;
        if (existe.length > 0) {
            res.send(0);
        } else {
            realizarQuery(`
                INSERT INTO Usuarios (nombre, apellido, mail, contrasena, foto_perfil, fecha_registro) VALUES
                ("${req.body.nombre}","${req.body.apellido}","${req.body.mail}","${req.body.contrasena}","${req.body.foto_perfil}",CURDATE());
            `);
            let id = await realizarQuery(`SELECT LAST_INSERT_ID()`);
            res.send(id[0]);
        }
    } catch (error) {
        res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
        res.send(-1);
    }
})

//chats
app.get('/chats', async function(req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT Chats.id_chat, nombre, foto_perfil FROM Chats INNER JOIN UsuariosxChats ON Chats.id_chat = UsuariosxChats.id_chat WHERE id_usuario = ${req.query.id_usuario}`);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
    }
})
app.get('/contacto', async function(req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT nombre, apellido, foto_perfil FROM Usuarios WHERE id_usuario = ${req.query.id_usuario}`);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
    }
})

// Chat individual
app.post('/contacto', async function(req, res) {
    try {
        console.log(req.body) ;
        let contacto = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE mail = "${req.body.mail}"`);
        if (contacto.length === 0) {
            throw new Error("No existe este usuario.");
        } else {
            let id_contacto = contacto[0].id_usuario;
            realizarQuery(`
                INSERT INTO Chats (fecha_creacion) VALUES
                (CURDATE())
            `);
            let id_chat = await realizarQuery(`SELECT LAST_INSERT_ID()`);
            realizarQuery(
                `INSERT INTO UsuariosxChats (id_usuario, id_chat, fecha_union) VALUES
                (${req.body.id_usuario}, ${id_chat}, CURDATE()),
                (${id_contacto}, ${id_chat}, CURDATE())
            `);
        }
    } catch (error) {
        if (error.message == "No existe este usuario.") {
            res.status(500).send(error.message) ;
        } else {
            res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
        }
    }
})

// Chat grupal
app.post('/grupo', async function(req, res) {
    try {
        console.log(req.body);
        let mails = req.body.mails;
        let usuarios = [req.body.id_usuario];
        let ocurrioError = false;
        for (let i = 0; i < mails.length; i++) {
            let id_mail = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE mail = ${mails[i]}`);
            if (id_mail === 0) {
                throw new Error("No existe uno de estos usuarios.");
                ocurrioError = true;
            } else {
                usuarios.push(id_mail[0].id_usuario);
            }
        }
        if (!ocurrioError) {
            realizarQuery(`
                INSERT INTO Chats (nombre, foto_perfil, fecha_creacion) VALUES
                ("${req.body.nombre}", "${req.body.foto_perfil}", CURDATE())
            `);
            const id_chat = await realizarQuery(`SELECT LAST_INSERT_ID()`);
            for (let i = 0; i < usuarios.length; i++) {
                realizarQuery(`
                    INSERT INTO UsuariosxChats (id_usuario, id_chat, fecha_union) VALUES
                    (${usuarios[i]}, ${id_chat}, CURDATE())
                `);
            }
        }
    } catch (error) {
        if (error.message == "No existe uno de estos usuarios.") {
            res.status(500).send(error.message) ;
        } else {
            res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
        }
    }
})

// Mensajes
app.get('/mensajes', async function(req, res) {
    try {
        let respuesta = await realizarQuery(`
            SELECT Usuarios.id_usuario, Usuarios.nombre, apellido, foto_perfil, texto, fecha_envio
            FROM Mensajes INNER JOIN Usuarios ON Mensajes.id_usuario = Usuarios.id_usuario 
            WHERE id_chat = ${req.query.id_chat} ORDER BY fecha_envio ASC
        `);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send('Ha ocurrido un error, intentar más tarde') ;
    }
})