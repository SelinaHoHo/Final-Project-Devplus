import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import CreateUser from "@/pages/Users/CreateUser/CreateUser";
import ListUser from "@/pages/User/ListUser";
import DetailUser from "@/pages/detailUser/DetailUser";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
import ListProject from "../pages/project/ListProject";

const CreateProject = lazy(() => import("@/pages/project/CreateProject"));
const PageNoFound = lazy(() => import("@/pages/PageNotFound"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/login/Login"));
const DetailProject = lazy(() => import("@/pages/project/DetailProject"));

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
              path: ":id",
              element: <DetailUser />,
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
              element: (
                <div>
                  {" "}
                  <ListProject />
                </div>
              ),
            },
            {
              path: "create",
              element: <CreateProject />,
            },
            {
              path: "edit",
              element: <div>Edit Projects</div>,
            },
            {
              path: "detail/:id",
              element: <DetailProject />,
            },
          ],
        },
        {
          path: "*",
          element: <PageNoFound />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNoFound />,
    },
  ]);
};

export default Router;
