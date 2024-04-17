import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import CreateUser from "@/pages/Users/CreateUser/CreateUser";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
import ListProject from "../pages/project/ListProject";
import ListUser from "../pages/Users/ListUser";

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
            {
              path: "createUser",
              element: <CreateUser />,
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
