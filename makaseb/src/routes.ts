import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  Add,
  DashboardRounded,
  EditOutlined,
  Person,
  PersonAdd,
} from "@material-ui/icons";
import React from "react";
import { Dashboard } from "./presentation/dashboard/dashboard";
import CreateDevice from "./presentation/device/createDevice/createDevice";
import CreateUser from "./presentation/user/createUser/createUser";
import { ManageUsers } from "./presentation/user/manageUsers/manageUsers";

export interface Rout {
  isProducted?: boolean;
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  component: React.FunctionComponent;
}

interface CategoryRout {
  routes: Rout[];
  name: string;
}

export const categoriesRoutes: CategoryRout[] = [
  {
    name: "",
    routes: [
      {
        path: "/",
        name: "Dashboard",
        icon: DashboardRounded,
        component: Dashboard,
      },
    ],
  },
  {
    name: "Device management",
    routes: [
      {
        path: "/device/new",
        name: "New Device",
        icon: Add,
        component: CreateDevice,
      },
    ],
  },
  {
    name: "Users management",
    routes: [
      {
        path: "/user",
        name: "Manage Users",
        icon: Person,
        component: ManageUsers,
      },
      {
        path: "/user/new",
        name: "Create User",
        icon: PersonAdd,
        component: CreateUser,
      },
    ],
  },
];
