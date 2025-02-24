import { Viewer } from "mapillary-js";
import "mapillary-js/dist/mapillary.css";
import { useEffect, useRef } from "react";

interface StreetView360Props {
  lat: number;
  lng: number;
  onClose: () => void;
}

const StreetView360: React.FC<StreetView360Props> = ({ lat, lng, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    const MAPILLARY_ACCESS_TOKEN = import.meta.env.VITE_MAPILLARY_ACCESS_TOKEN;

    if (!MAPILLARY_ACCESS_TOKEN) {
      console.error(
        "❌ Error: MAPILLARY_ACCESS_TOKEN no está definido en .env"
      );
      return;
    }

    if (!containerRef.current) {
      console.error("❌ Error: Contenedor de Mapillary no encontrado.");
      return;
    }

    // Inicializar el visor de Mapillary
    if (!viewerRef.current) {
      viewerRef.current = new Viewer({
        accessToken: MAPILLARY_ACCESS_TOKEN,
        container: containerRef.current,
      });
    }

    // Función para obtener imágenes cercanas
    const fetchNearbyImage = async () => {
      try {
        // Define un margen de 0.01 grados (≈1 km) alrededor del punto
        const margin = 0.01;
        const bbox = `${lng - margin},${lat - margin},${lng + margin},${lat + margin}`;

        const response = await fetch(
          `https://graph.mapillary.com/images?access_token=${MAPILLARY_ACCESS_TOKEN}&fields=id&limit=1&bbox=${bbox}`
        );
        const data = await response.json();
        console.log("📸 Respuesta de Mapillary:", data);

        if (data.data && data.data.length > 0) {
          const imageId = data.data[0].id;
          console.log(`✅ Imagen encontrada: ${imageId}`);
          viewerRef.current?.moveTo(imageId);
        } else {
          console.warn("⚠️ No se encontraron imágenes en esta ubicación.");
        }
      } catch (error) {
        console.error("❌ Error al obtener imágenes de Mapillary:", error);
      }
    };

    fetchNearbyImage();

    return () => {
      viewerRef.current?.remove();
      viewerRef.current = null;
    };
  }, [lat, lng]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 z-50"
        >
          Cerrar
        </button>
        <div ref={containerRef} className="w-full h-96 bg-gray-200" />
      </div>
    </div>
  );
};

export default StreetView360;
