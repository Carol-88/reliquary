import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import StreetView360 from "./StreetView360";

interface MapViewProps {
  lat: number;
  lng: number;
}

const MapUpdater: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      console.log("Actualizando vista del mapa:", lat, lng);
      map.setView([lat, lng], 15);

      setTimeout(() => {
        map.invalidateSize(); // Forzar redibujado
        console.log("Forzando redibujado del mapa");
      }, 500);
    }
  }, [lat, lng, map]);

  return null;
};

const MapClickHandler: React.FC<{
  onClick: (lat: number, lng: number) => void;
}> = ({ onClick }) => {
  useMapEvents({
    click(e) {
      console.log("Clic en el mapa:", e.latlng);
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

const MapView: React.FC<MapViewProps> = ({ lat, lng }) => {
  const [streetViewPosition, setStreetViewPosition] = useState<
    [number, number] | null
  >(null);

  const handleMapClick = (lat: number, lng: number) => {
    const roundedLat = parseFloat(lat.toFixed(3));
    const roundedLng = parseFloat(lng.toFixed(3));

    console.log("Abriendo StreetView en:", roundedLat, roundedLng);
    setStreetViewPosition([roundedLat, roundedLng]);
  };

  const closeStreetView = () => {
    console.log("Cerrando StreetView");
    setStreetViewPosition(null);
  };

  if (!lat || !lng) {
    return <p className="text-center text-gray-500">Cargando mapa...</p>;
  }

  return (
    <div className="relative h-[500px] w-full">
      <MapContainer
        key={`${lat}-${lng}`} // Forzar renderización cuando cambian lat/lng
        center={[lat, lng]}
        zoom={15}
        className="h-[500px] w-full rounded-lg border border-gray-300"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker
          position={[lat, lng]}
          icon={L.icon({
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
        <MapUpdater lat={lat} lng={lng} />
        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>

      {streetViewPosition && streetViewPosition[0] && streetViewPosition[1] && (
        <StreetView360
          lat={streetViewPosition[0]}
          lng={streetViewPosition[1]}
          onClose={closeStreetView}
        />
      )}
    </div>
  );
};

export default MapView;
