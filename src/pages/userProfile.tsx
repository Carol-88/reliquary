import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/useUserStore";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { name, level, setUser } = useUserStore();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Usuario: {name}</h1>
      <h2 className="text-lg">Nivel: {level}</h2>
      <button
        onClick={() => setUser("ExploradorX", 5)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Actualizar
      </button>
      <Link to={ROUTES.AUCTION} className="block mt-4 text-blue-600 underline">
        Ir a la subasta
      </Link>
    </div>
  );
};
