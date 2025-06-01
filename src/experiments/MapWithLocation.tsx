import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useCurrentLocation } from "@/hooks/useCurrentLocation"; // Adjust path if needed
import { Box, Spinner, Text } from "@chakra-ui/react";

// Fix leaflet default icon issues
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Auto-center map to given coordinates
const SetView = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13);
    }
  }, [coords, map]);

  return null;
};

const MapWithLocation: React.FC = () => {
  const { location, error } = useCurrentLocation();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (location) {
      setPosition([location.latitude, location.longitude]);
    }
  }, [location]);

  const handleDragEnd = async (e: L.LeafletEvent) => {
    const marker = e.target;
    const newPos = marker.getLatLng();
    setPosition([newPos.lat, newPos.lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newPos.lat}&lon=${newPos.lng}`
      );
      const data = await response.json();
      console.log("Reverse Geocoded Address:", data.display_name);
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
    }
  };

  if (error) return <Text color="red.500">{error}</Text>;
  if (!position)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Spinner size="lg" />
      </Box>
    );

  return (
    <Box w="100%" h="400px" borderRadius="md" overflow="hidden">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <SetView coords={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={position} draggable eventHandlers={{ dragend: handleDragEnd }}>
          <Popup>Drag me to update your location!</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default MapWithLocation;
