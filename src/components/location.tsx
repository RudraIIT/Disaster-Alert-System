"use client";

import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";

export const Location = () => {
  const { socket } = useSocketContext()
  useEffect(() => {
    if (navigator.geolocation && socket) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude is :', latitude);
          console.log('Longitude is :', longitude);
          socket.emit('location', { latitude, longitude });
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, [socket, navigator.geolocation])
  return null;
}