"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// FIX ICONS (safe inside client-only file)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapInner({ properties }) {
  const center = [37.9838, 23.7275];

  return (
    <MapContainer center={center} zoom={13} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {properties?.map((p) => (
        <Marker key={p.id} position={[p.latitude, p.longitude]}>
          <Popup>{p.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
