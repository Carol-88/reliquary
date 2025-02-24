import { useState } from "react";
import MapView from "./MapView";
import SearchBar from "./SearchPostalCode";

const StreetView = () => {
  const [location, setLocation] = useState({ lat: 40.4168, lng: -3.7038 }); // Madrid por defecto

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2">Buscar Tesoro</h2>
      <SearchBar onLocationChange={(lat, lng) => setLocation({ lat, lng })} />
      <MapView lat={location.lat} lng={location.lng} />
    </div>
  );
};

export default StreetView;
