"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";

export default function LoginPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = () => {
        const datos = {mail: mail, contrasena: password};

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => response.json())
            .then(data => {
                if (data === 0){
                    return(
                        <p>Mail o contraseña incorrectos, intenta denuevo.</p>
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
        <>
            <h1>Login</h1>
            <Input type={"text"} text={"Mail"} change={setMail}></Input>
            <input type={"password"} text={"Contraseña"} change={setPassword}></input>
            <br></br>
            <Button text={"Iniciar Sesion"} funcion={iniciarSesion}></Button>
        </>
    )
}