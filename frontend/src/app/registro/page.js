"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [foto, setFoto] = useState("");

    const registrarse = () => {
        const datos = new FormData();

        datos.append("nombre", nombre);
        datos.append("apellido", apellido);
        datos.append("mail", mail);
        datos.append("contrasena", password);
        datos.append("foto_perfil", foto);

        fetch('http://localhost:3001/register', {
            method: 'POST',
            body: datos
        })
            .then(response => response.json())
            .then(data => {
                if (data === 0){
                    return(
                        <p>Ya existe una cuenta con este mail, intente denuevo.</p>
                    )
                } else if (data === -1) {
                    return(
                        <p>A ocurrido un error, intente denuevo más tarde.</p>
                    )
                } else {

                }
            });
    }

    return(
        <main>
            <h1>Pio Chat</h1>
            <br></br>
            <h2>Registro</h2>
            <Input type={"text"} text={"Nombre"} change={setNombre}></Input>
            <Input type={"text"} text={"Apellido"} change={setApellido}></Input>
            <Input type={"email"} text={"Mail"} change={setMail}></Input>
            <Input type={"password"} text={"Contraseña"} change={setPassword}></Input>
            <Input type={"file"} text={"Foto de perfil"} change={setFoto}></Input>
        </main>
    )
}