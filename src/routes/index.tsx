import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import { lazy } from "react";
// import { Navigate, useRoutes } from "react-router-dom";
// import LayoutPage from "../components/layout";
// const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/login/Login"));
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
import ListUser from "@/pages/User/ListUser";
import Dashboard from "@/pages/Dashboard";
// import Dashboard from "@/pages/Dashboard";

const Router = () => {
  return useRoutes([
    {
      path: "sign-in",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <LayoutPage />
        </AuthGuard>
      ),
      children: [
        {
          path: "",
          element: <Navigate to='dashboard' />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "users",
          children: [
            {
              index: true,
              element: <Navigate to='/users/list' replace />,
            },
            {
              path: "list",
              element: <ListUser />,
            },
            {
              path: "edit",
              element: <div>Edit Users</div>,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },
  ]);
};

export default Router;
