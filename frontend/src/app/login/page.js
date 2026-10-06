"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const router = useRouter();

    const iniciarSesion = () => {
        const datos = {mail: mail, contrasena: password};

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => response.json())
            .then(data => {
                if (data === 0){
                    setError("Mail o contraseña incorrectos.");
                } else if (data === -1) {
                    setError("Ha ocurrido un error, intente denuevo más tarde.");
                } else {
                    router.replace("/listaChats");
                }
            });
    }

    return(
        <main>
            <h1>Pio Chat</h1>
            <br></br>
            <h2>Login</h2>
            <Input type={"email"} text={"Mail"} change={setMail}></Input>
            <Input type={"password"} text={"Contraseña"} change={setPassword}></Input>
            <br></br>
            <Button text={"Iniciar Sesion"} funcion={iniciarSesion}></Button>
            {error && (<p>{error}</p>)}
        </main>
    )
}