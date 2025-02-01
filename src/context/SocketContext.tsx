"use client"
import { createContext,useContext,useState,useEffect } from "react";
import io, {Socket} from 'socket.io-client';
import Cookies from "js-cookie";

interface SocketContextType {
  socket: Socket | null;
}

const socketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
    const context = useContext(socketContext);
    if(!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
}

export const SocketProvider = ({children} : {children: React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const user_id = Cookies.get('user');
    // console.log(user_id);
    useEffect(() => {
        const newSocket = io('http://127.0.0.1',{
            withCredentials: true,
            transports: ['websocket'],
            query: {
                user_id : user_id
            }
        });
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}