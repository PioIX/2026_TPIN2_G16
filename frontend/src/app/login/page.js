"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

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
                    router.replace("/chats");
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
        </main>
    )
}