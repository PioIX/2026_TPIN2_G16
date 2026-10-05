"use client"

import { useEffect, useState } from "react";
import ChatList from "@/components/ChatList";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function ChatsPage() {
    const [chats, setChats] = useState([]);
    const [mail, setMail] = useState("");

    const crearChat = () => {
        
    }

    const crearGrupo = () => {}

    useEffect(() => {
        const cargarChats = () => {
            fetch('http://localhost:3001/chats')
                .then(response => response.json())
                .then(data => setChats(data));
        }
    })

    return (
        <main>
            <h1>Pio Chat</h1>
            <Popup trigger={<Button text={"Agregar contacto"}></Button>}>
                <div>
                    <h2>Nuevo Contacto</h2>
                    <Input type={"email"} text={"Mail del usuario"} change={setMail}></Input>
                    <Button text={"Crear chat"} funcion={crearChat}></Button>
                </div>
            </Popup>
            <Popup trigger={<Button text={"Crear grupo"}></Button>}>
                <div>
                    <h2>Nuevo Grupo</h2>
                </div>
            </Popup>
            <ChatList chats={chats}></ChatList>
        </main>
    )
}