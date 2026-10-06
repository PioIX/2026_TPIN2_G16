"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [foto, setFoto] = useState(null);

    const [error, setError] = useState("");

    const router = useRouter();

    const registrarse = () => {
        const datos = new FormData();

        datos.append("nombre", nombre);
        datos.append("apellido", apellido);
        datos.append("mail", mail);
        datos.append("contrasena", password);
        datos.append("foto_perfil", foto);

        fetch('http://localhost:4000/register', {
            method: 'POST',
            body: datos
        })
            .then(response => response.json())
            .then(data => {
                if (data === 0){
                    setError("Ya existe una cuenta con este mail.");
                } else if (data === -1) {
                    setError("Ha ocurrido un error, intente denuevo más tarde.")
                } else {
                    router.replace("/listaChats");
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
            <br></br>
            <Button text={"Registrarse"} funcion={registrarse}></Button>
            {error && (<p>{error}</p>)}
        </main>
    )
}