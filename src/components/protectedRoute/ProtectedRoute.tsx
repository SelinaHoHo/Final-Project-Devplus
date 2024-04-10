import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  if (!isAuth) {
    // user is n    ot authenticated
    return <Navigate to='/sign-in' />;
  }
  return children;
};
