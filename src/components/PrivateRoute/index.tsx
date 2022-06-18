import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
  const auth = localStorage.getItem("token");
  return auth ? children : <Navigate to="/" />;
}
