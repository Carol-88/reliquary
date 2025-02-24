import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchPostalCode";

export default function App() {
  const [location, setLocation] = useState({ lat: 40.4168, lng: -3.7038 });
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500">
        ¡Tailwind está funcionando en React + TypeScript! 🎉
      </h1>
      <Link to={ROUTES.PROFILE} className="text-blue-600 underline mt-4">
        Ir al perfil
      </Link>
      <div className="flex flex-col items-center p-4">
        <SearchBar onLocationChange={(lat, lng) => setLocation({ lat, lng })} />
        <MapView lat={location.lat} lng={location.lng} />
      </div>
    </div>
  );
}
