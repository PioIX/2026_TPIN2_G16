"use client"

import ChatItem from "@/components/ChatItem";

export default function ChatList({ chats }) {
    return (
        <div>
            {chats.map((chat) => (
                <ChatItem key={chat.id_chat} chat={chat}></ChatItem>
            ))}
        </div>
    )
}