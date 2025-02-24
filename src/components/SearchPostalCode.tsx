import { useState } from "react";

interface SearchBarProps {
  onLocationChange: (lat: number, lng: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationChange }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}, Spain`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        onLocationChange(parseFloat(lat), parseFloat(lon));
      } else {
        alert("No se encontraron resultados para ese código postal.");
      }
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  };

  return (
    <div className="flex gap-2 p-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Introduce un código postal..."
        className="border p-2 rounded-lg w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
