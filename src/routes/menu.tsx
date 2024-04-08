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
    ],
  },
];
