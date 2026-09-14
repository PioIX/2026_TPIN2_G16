CREATE TABLE IF NOT EXISTS Usuarios(
id_usuario int auto_increment unique NOT null,
nombre varchar(255),
apellido varchar(255),
mail varchar(255),
contrasena varchar(25),
foto_perfil varchar(255),
fecha_registro date,
PRIMARY KEY(id_usuario)
);

INSERT INTO Usuarios(nombre, apellido, mail, contrasena, foto_perfil, fecha_registro) VALUES 
("Marcos", "Lopez", "mlopez@gmail.com", "123456", "2026_TPIN2_G16/frontend/public/foto_perfil.png", "2026-09-10"),
("Martina", "Morales", "mmorales@gmail.com", "121212", "2026_TPIN2_G16/frontend/public/foto_perfil.png", "2026-09-10"),
("Camila", "Morales", "cmorales@gmail.com", "232323", "2026_TPIN2_G16/frontend/public/foto_perfil.png", "2026-09-10"),
("Mia", "Morales", "miamorales@gmail.com", "343434", "2026_TPIN2_G16/frontend/public/foto_perfil.png", "2026-09-10"),
("Pablo", "Diaz", "pdiaz@gmail.com", "654321", "2026_TPIN2_G16/frontend/public/foto_perfil.png", "2026-09-10");

CREATE TABLE IF NOT EXISTS Chats(
id_chat int auto_increment unique NOT null,
fecha_creacion date,
nombre varchar(30),
foto_perfil varchar(255),
PRIMARY KEY(id_chat)
);

INSERT INTO Chats(fecha_creacion, nombre, foto_perfil) VALUES 
("2026-09-10", "Hermanas", "2026_TPIN2_G16/frontend/public/foto_grupo.png"),
("2026-09-10", "TP historia", "2026_TPIN2_G16/frontend/public/foto_grupo.png");

CREATE TABLE IF NOT EXISTS UsuariosxChats(
id_usuario int,
id_chat int,
fecha_ingreso date,
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
FOREIGN KEY (id_chat) REFERENCES Chats(id_chat)
);

INSERT INTO UsuariosxChats(id_usuario, id_chat, fecha_ingreso) VALUES
(1, 2, "2026-09-10"),
(2, 2, "2026-09-10"),
(5, 2, "2026-09-10"),
(2, 1, "2026-09-10"),
(3, 1, "2026-09-10"),
(4, 1, "2026-09-10");

CREATE TABLE IF NOT EXISTS Mensajes(
id_mensaje int auto_increment unique NOT null,
id_chat int,
id_usuario int,
texto varchar(1000),
fecha_envio datetime,
PRIMARY KEY (id_mensaje),
FOREIGN KEY (id_chat) REFERENCES Chats(id_chat),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

INSERT INTO Mensajes(id_chat, id_usuario, texto, fecha_envio) VALUES
(1, 2, "Hola chicass", "2026-09-10 10:00:00"),
(1, 3, "Hola hermana", "2026-09-10 10:01:00"),
(2, 1, "Hola chicos, hoy hago mi parte y se las mando", "2026-09-10 12:34:56"),
(2, 5, "Hola, yo hoy no tengo tiempo pero más tarde en la semana lo mando", "2026-09-10 12:45:12"),
(2, 2, "Bueno, pero acordate que se entrega ya el lunes asi que no te olvides", "2026-09-10 13:02:08");
