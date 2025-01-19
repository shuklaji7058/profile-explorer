import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const MapController = ({ coordinates, onLoad }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates);
    onLoad?.();
  }, [map, coordinates, onLoad]);

  return null;
};

const LeafletMapComponent = ({ coordinates, address, onLoad }) => {
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <MapController coordinates={coordinates} onLoad={onLoad} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMapComponent;
