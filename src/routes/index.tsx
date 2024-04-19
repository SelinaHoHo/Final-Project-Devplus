import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import ListUser from "@/pages/User/ListUser";
import CreateUser from "@/pages/Users/CreateUser/CreateUser";
import DetailUser from "@/pages/detailUser/DetailUser";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
import ListProject from "../pages/project/ListProject";

const CreateProject = lazy(() => import("@/pages/project/CreateProject"));
const PageNoFound = lazy(() => import("@/pages/PageNotFound"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/login/Login"));
const DetailProject = lazy(() => import("@/pages/project/Detail/DetailProject"));

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
          path: "employees",
          children: [
            {
              index: true,
              element: <Navigate to='/employees/list' replace />,
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
              path: "createEmployee",
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
              path: ":id",
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
