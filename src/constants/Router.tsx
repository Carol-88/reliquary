import App from "@/App";
import { ROUTES } from "@/constants/routes";
import { Profile } from "@/pages/userProfile";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<App />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
    </Routes>
  );
}
