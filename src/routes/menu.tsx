import { MenuList } from "../interfaces/layout/menu.interface";

export const menuList: MenuList = [
  {
    code: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    path: "/dashboard",
  },
  {
    code: "users",
    label: "Users",
    icon: "user",
    path: "/users",
    children: [
      {
        code: "list",
        label: "List Users",
        path: "/users/list",
      },
      {
        code: "createUser",
        label: "Create User",
        path: "/users/createUser",
      },
    ],
  },
  {
    code: "projects",
    label: "Projects",
    icon: "project",
    path: "/projects",
    children: [
      {
        code: "list",
        label: "List Projects",
        path: "/projects/list",
      },
      {
        code: "create",
        label: "Create Projects",
        path: "/projects/create",
      },
    ],
  },
];
