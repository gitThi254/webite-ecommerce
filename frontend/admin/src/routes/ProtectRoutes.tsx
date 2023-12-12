import { useVerify } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProtectRoutes = () => {
  const { data: user } = useVerify();
  if (!user) {
    return <Navigate to='/login' replace />;
  }
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={250}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='light'
      />
      <Outlet />
    </>
  );
};

export default ProtectRoutes;
