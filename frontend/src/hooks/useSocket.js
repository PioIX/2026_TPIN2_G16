import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket({ serverUrl = "ws://localhost:4000", options =
{} }) {
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    
    if (!socketRef.current) {
        socketRef.current = io(serverUrl, options);
    }

    useEffect(() => {
        const socket = socketRef.current;

        const onConnect = () => {
            setIsConnected(true);
            console.log("✅ WebSocket conectado:", socket.id);
        };
        socket.on("connect", onConnect);

        const onDisconnect = () => {
            setIsConnected(false);
            console.log("❌ WebSocket desconectado");
        };
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return { socket: socketRef.current, isConnected };
}