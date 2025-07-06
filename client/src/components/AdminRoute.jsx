import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.user?.user?.isAdmin);
  console.log(isAdmin);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
