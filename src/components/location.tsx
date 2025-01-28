"use client";

import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const Location = () => {
  const { socket } = useSocketContext();
  const user = Cookies.get("user");

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation && socket) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude is:", latitude);
          console.log("Longitude is:", longitude);
          socket.emit("location", { user, latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [socket,user]);

  return null;
};
