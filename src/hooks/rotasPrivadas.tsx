import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      // Token expirado
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    return <Outlet />; // continua para a rota protegida
  } catch (error) {
    // Token inválido
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
}
