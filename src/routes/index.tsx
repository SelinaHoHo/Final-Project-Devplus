import GuestGuard from "@/guards/GuestGuard";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
import ListProject from "../pages/project/ListProject";

const CreateProject = lazy(() => import("@/pages/project/CreateProject"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/login/Login"));

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
        <GuestGuard>
          <LayoutPage />
        </GuestGuard>
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
              element: <div>List Users</div>,
            },
            {
              path: "edit",
              element: <div>Edit Users</div>,
            },
          ],
        },
        {
          path: "projects",
          children: [
            {
              index: true,
              element: <Navigate to='/projects/list' replace />,
            },
            {
              path: "list",
              element: <ListProject />,
            },
            {
              path: "create",
              element: <CreateProject />,
            },
            {
              path: "edit",
              element: <div>Edit Projects</div>,
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
