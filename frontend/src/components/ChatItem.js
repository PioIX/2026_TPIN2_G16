"use client"

import { useRouter } from "next/navigation";

export default function ChatItem({ chat }) {
    const router = useRouter();

    const abrirChat = () => {
        router.push(`/chat?chat=${chat.id_chat}`);
    }

    let foto;
    if (chat.foto_perfil) {
        foto = chat.foto_perfil;
    } else {
        foto = "/default.png";
    }

    return(
        <div onClick={() => {abrirChat(chat.id_chat)}}>
            <img src={foto} alt="Foto del chat" width={"50"} height={"50"}></img>
            <h3>{chat.nombre}</h3>
        </div>
    )
}