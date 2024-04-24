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
    path: "/employees",
    children: [
      {
        code: "list",
        label: "List Users",
        path: "/employees/list",
      },
      {
        code: "createUser",
        label: "Create User",
        path: "/employees/createEmployee",
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
  {
    code: "technicals",
    label: "Technicals",
    icon: "technical",
    path: "/technicals",
  },
  {
    code: "languages",
    label: "Languages",
    icon: "language",
    path: "/languages",
  },
  {
    code: "positions",
    label: "Positions",
    icon: "position",
    path: "/positions",
  },
];
