import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

interface MapViewProps {
  lat: number;
  lng: number;
}

const MapUpdater: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useMemo(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
};

const MapView: React.FC<MapViewProps> = ({ lat, lng }) => {
  const position: [number, number] = useMemo(() => [lat, lng], [lat, lng]);

  return (
    <MapContainer
      center={position}
      zoom={15}
      className="h-96 w-full rounded-lg"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker
        position={position}
        icon={L.icon({ iconUrl: "/marker-icon.png" })}
      />
      <MapUpdater lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default MapView;
