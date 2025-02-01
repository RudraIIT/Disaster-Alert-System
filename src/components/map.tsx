"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from "react-leaflet";
import { Icon, LatLngTuple, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketContext";
import axios from "axios";
import { toast } from "sonner";

type markers = {
  position: number[];
  popup: string | "This is a test location";
  status: string | "low" | "medium" | "high";
  key: string;
}[];

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  const [defaultLocation, setDefaultLocation] = useState([31.7754, 76.9861])
  const zoom = 15;
  const { socket } = useSocketContext();
  // const demoMarkers = [
  //   {
  //     position: [31.7754, 76.9861],
  //     popup: "This is a test location",
  //     status: "low"
  //   },
  //   {
  //     position: [26.7754, 81.9861],
  //     popup: "This is a test location",
  //     status: "danger"
  //   },
  //   {
  //     position: [21.7754, 91.9861],
  //     popup: "This is a test location",
  //     status: "medium"
  //   },
  //   {
  //     position: [16.7754, 101.9861],
  //     popup: "This is a test location",
  //     status: "medium"
  //   },
  //   {
  //     position: [11.7754, 111.9861],
  //     popup: "This is a test location",
  //     status: "high"
  //   },
  //   {
  //     position: [6.7754, 121.9861],
  //     popup: "This is a test location",
  //     status: "low"
  //   },
  //   {
  //     position: [1.7754, 131.9861],
  //     popup: "This is a test location",
  //     status: "high"
  //   }
  // ]
  // const [markers, setMarkers] = useState<markers>(demoMarkers);
  const [markers, setMarkers] = useState<markers>([]);
  const customIconLow = new Icon({
    iconUrl: "/images/markerIconLow.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  const customIconMedium = new Icon({
    iconUrl: "/images/markerIconMedium.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  const customIconHigh = new Icon({
    iconUrl: "/images/markerIconHigh.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  const createCustomClusterIcon = (cluster: any) => {
    return divIcon({
      html: `<div><p>${cluster.getChildCount()}</p></div>`,
      iconSize: [30,30],
      className: "bg-green-600 rounded-full flex justify-center items-center text-white font-bold text-xl pl-[10px] pt-[2.5px]"
    });
  }
  const [center, setCenter] = useState<number[]>(defaultLocation);
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const fetchMarkers = async () => {
      // fetch alert danger locations and set it in markers
      const response = await axios.get('http://localhost:80/markers');
      // response is like [id,latitude,longitude]
      const data = response.data;
      const markers = data.map((marker: any) => {
        return {
          position: [marker['latitude'], marker['longitude']],
          popup: marker['description'],
          status: marker['status'],
          key : marker['id']
        }
      });
      setMarkers(markers);
    }
    fetchMarkers();
  }, []);
  useEffect(() => {
    const addMarker = (data : any) => {
      const marker = {
        position: data.position,
        popup: data.popup,
        status: data.status,
        key: data.key
      };
      
      toast.warning("New Alert: " + data.popup);
      setMarkers(prev => [...prev, marker]);
      console.log(markers);
    }
    socket?.on("alert", addMarker);
    return () => {
      socket?.off("alert", addMarker);
    }
  }, [socket, setMarkers])
  useEffect(() => {
    if (navigator.geolocation && socket) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude is :', latitude);
          console.log('Longitude is :', longitude);
          setDefaultLocation([latitude, longitude]);
          setRerender(prev => !prev);
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, [navigator.geolocation])
  useEffect(() => {
    if (markers) {
      if (markers?.length === 0) {
        setCenter(defaultLocation)
        return;
      } else {
        for (let i = 0; i < markers.length; i++) {
          if (markers[i].status !== "normal") {
            setCenter([markers[i].position[0], markers[i].position[1]]);
            return
          }
        }
      }
    } else {
      setCenter(defaultLocation)
      return;
    }
    setCenter([markers[0].position[0], markers[0].position[1]]);
    setRerender(prev => !prev);
  },[markers]);
  return (
    <MapContainer
    key={rerender.toString()}
    center={center as LatLngTuple}
    zoom={zoom}
    className={`${className}`} >
      <TileLayer
        url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers && markers.map(({ position, popup, status, key }) => {
          return <Marker key={key} position={position as LatLngTuple} icon={status == "low" ? customIconLow : status == "medium" ? customIconMedium : customIconHigh}>
            <Popup>{popup}</Popup>
          </Marker>
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;