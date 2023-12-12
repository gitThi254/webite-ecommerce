import { Navigate, Outlet } from "react-router-dom";
import { useVerify } from "../hooks/useAuth";

const BasicRoute = () => {
  const { data: user } = useVerify();

  if (user) {
    return <Navigate to='/' replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default BasicRoute;
