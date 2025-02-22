import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/useUserStore";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { name, level, setUser } = useUserStore();

  return (
    <div>
      <h1>Usuario: {name}</h1>
      <h2>Nivel: {level}</h2>
      <button onClick={() => setUser("ExploradorX", 5)}>Actualizar</button>
      <Link to={ROUTES.AUCTION}>Ir a la subasta</Link>;
    </div>
  );
};
