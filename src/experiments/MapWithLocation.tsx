import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon issues with Leaflet
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const SetView = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
};

const MapWithLocation: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  // Fetch user geolocation only once on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Geolocation error", err);
        // Optional: fallback to a default position
        setPosition([18.5204, 73.8567]); // Pune coordinates fallback
      }
    );
  }, []);

  const handleDragEnd = async (e: L.LeafletEvent) => {
    const marker = e.target;
    const newPos = marker.getLatLng();
    setPosition([newPos.lat, newPos.lng]);

    // Reverse geocode example (optional)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newPos.lat}&lon=${newPos.lng}`
      );
      const data = await response.json();
      console.log("Address:", data.display_name);
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  };

  if (!position) return <p>Loading location...</p>;

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <SetView coords={position} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={position} draggable eventHandlers={{ dragend: handleDragEnd }}>
        <Popup>Drag me to update your location!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithLocation;
