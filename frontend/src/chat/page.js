"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Mensaje from "@/components/Mensaje";

export default function ChatPage() {
    const searchParams = useSearchParams();
    const id_chat = searchParams.get("id");

    const [mensajes, setMensajes] = useState([]);
    const [id, setId] = useState(null);
    const [nuevoMsj, setNuevoMsj] = useState("");

    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.emit("join_chat", {
                chat: id_chat
            })
        }
    }, [socket, isConnected]);

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (data) => {setMensajes([...mensajes, data])});

        return () => {
            socket.off("newMessage");
        }
    }, [socket])

    useEffect(() => {
        const cargarId = () => {
            fetch(`http://localhost:4000/id`)
                .then(response => response.json())
                .then(data => setId(data));
        }

        const cargarMensajes = () => {
            fetch(`http://localhost:4000/mensajes?id_chat=${id_chat}`)
                .then(response => response.json())
                .then(data => setMensajes(data));
        }
    }, [id_chat]);

    const enviarMensaje = () => {
        if (nuevoMsj) {
            socket.emit("sendMessage", { texto: nuevoMsj });
            setNuevoMsj("");
        }
    }

    return(
        <main>
            <div>
                {mensajes.map((msj) => {
                    if (msj.id_usuario === id) {
                        <Mensaje key={msj.id_mensaje} nombre={"Tú"} texto={msj.texto} color={"green"} posicion={"right"}></Mensaje>
                    } else {
                        <Mensaje key={msj.id_mensaje} nombre={msj.nombre} texto={msj.texto} color={"white"} posicion={"left"}></Mensaje>
                    }
                })}
            </div>
            <div>
                <Input type={"text"} text={""} change={setNuevoMsj}></Input>
                <Button text={"Enviar"} funcion={enviarMensaje}></Button>
            </div>
        </main>
    )
}