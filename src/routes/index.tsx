import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import EmployeeDetail from "@/pages/User/Detail/EmployeeDetail";
import ListUser from "@/pages/User/ListUser";
import CreateUser from "@/pages/Users/CreateUser/CreateUser";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LayoutPage from "../components/layout";
import ListProject from "../pages/project/List/ListProject";

const TechnicalPage = lazy(() => import("@/pages/technical/TechnicalPage"));
const LanguagePage = lazy(() => import("@/pages/language/LanguagePage"));
const PositionPage = lazy(() => import("@/pages/position/PositionPage"));
const CreateProject = lazy(() => import("@/pages/project/Create/CreateProject"));
const PageNoFound = lazy(() => import("@/pages/PageNotFound"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/login/Login"));
const DetailProject = lazy(() => import("@/pages/project/Detail/DetailProject"));
const UpdateProject = lazy(() => import("@/pages/project/Update/UpdateProject"));

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
              path: "detail/:id",
              element: <EmployeeDetail />,
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
              path: "edit/:id",
              element: <UpdateProject />,
            },
            {
              path: "detail/:id",
              element: <DetailProject />,
            },
          ],
        },
        {
          path: "technicals",
          element: <TechnicalPage />,
        },
        {
          path: "languages",
          element: <LanguagePage />,
        },
        {
          path: "positions",
          element: <PositionPage />,
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
