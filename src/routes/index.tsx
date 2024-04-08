import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
const Dashboard = lazy(() => import("@/pages/Dashboard"));

const Router = () => {
  return useRoutes([
    {
      path: "sign-in",
      element: <div>Login</div>,
    },
    {
      path: "/",
      element: <LayoutPage />,
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
              element: <div>List Users</div>,
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
