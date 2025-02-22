import { ROUTES } from "@/constants/routes";
import { Profile } from "@/pages/userProfile";
import { Link, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500">
        ¡Tailwind está funcionando en React + TypeScript! 🎉
      </h1>
      <Link to={ROUTES.PROFILE} className="text-blue-600 underline mt-4">
        Ir al perfil
      </Link>

      {/* Definimos las rutas aquí */}
      <Routes>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Routes>
    </div>
  );
}
