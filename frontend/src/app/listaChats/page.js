"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatList from "@/components/ChatList";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function ListaChatsPage() {
    const router = useRouter();
    const idUsuario = json.parse(localStorage.getItem("idUsuario"));
    const [chats, setChats] = useState([]);

    const [mail, setMail] = useState("");
    const [nombre, setNombre] = useState("");
    const [foto, setFoto] = useState(null);
    const [errorContacto, setErrorContacto] = useState("");

    const [mailsGrupo, setMailsGrupo] = useState([]);
    const [nombreGrupo, setNombreGrupo] = useState("");
    const [fotoGrupo, setFotoGrupo] = useState(null);
    const [errorGrupo, setErrorGrupo] = useState("");

    const crearChat = () => {
        if (!mail || !nombre) {
            return(<p>Faltan completar datos</p>)
        } else {
            const datos = new FormData();
            datos.append("mail", mail);
            datos.append("nombre", nombre);
            datos.append("foto_perfil", foto);

            fetch('http://localhost:4000/contacto', {
                method: 'POST',
                body: datos
            })
                .then(response => response.json())
                .then(data => {
                    if (data === 0) {
                        setErrorContacto("No existe este usuario.")
                    } else if (data === -1) {
                        setErrorContacto("Ha ocurrido un error, intenta denuevo más tarde.")
                    } else {
                        setMail("");
                        setNombre("");
                        setFoto(null);
                        router.refresh();
                    }
                });
        }
    }

    const crearGrupo = () => {
        if (!mailsGrupo || !nombre) {
            return(<p>Faltan completar datos</p>)
        } else {
            const listaMails = mails.split(",");

            const datos = new FormData();
            datos.append("mails", json.stringify(listaMails));
            datos.append("nombre", nombreGrupo);
            datos.append("foto_perfil", fotoGrupo);

            fetch('http://localhost:4000/grupo', {
                method: 'POST',
                body: datos
            })
                .then(response => response.json())
                .then(data => {
                    if (data === 0) {
                        setErrorGrupo("No se encontro a uno o más usuarios.")
                    } else if (data === -1) {
                        setErrorGrupo("Ha ocurrido un error, intenta denuevo más tarde.")
                    } else {
                        setMailsGrupo("");
                        setNombreGrupo("");
                        setFotoGrupo(null);
                        router.refresh();
                    }
                });
        }
    }

    const abrirChat = (id) => {
        router.push(`/chat?id=${id}`)
    }

    useEffect(() => {
        const cargarChats = () => {
            fetch('http://localhost:4000/chats')
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
                    <Input type={"text"} text={"Nombre del chat"} change={setNombre}></Input>
                    <Input type={"file"} text={"Foto del chat"} change={setFoto}></Input>
                    <Button text={"Crear chat"} funcion={crearChat}></Button>
                    {errorContacto && (<p>{errorContacto}</p>)}
                </div>
            </Popup>
            <Popup trigger={<Button text={"Crear grupo"}></Button>}>
                <div>
                    <h2>Nuevo Grupo</h2>
                    <Input type={"text"} text={"Mails, separados por coma"} change={setMailsGrupo}></Input>
                    <Input type={"text"} text={"Nombre del grupo"} change={setNombreGrupo}></Input>
                    <Input type={"file"} text={"Foto del grupo"} change={setFotoGrupo}></Input>
                    <Button text={"Crear grupo"} funcion={crearGrupo}></Button>
                    {errorGrupo && (<p>{errorGrupo}</p>)}
                </div>
            </Popup>
            <ChatList chats={chats}></ChatList>
        </main>
    )
}