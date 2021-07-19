import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  Add,
  DashboardRounded,
  EditOutlined,
  Person,
  PersonAdd,
} from "@material-ui/icons";
import React, { ComponentClass } from "react";
import { Dashboard } from "./presentation/dashboard/dashboard";
import CreateDevice from "./presentation/device/createDevice/createDevice";
import CreateUser from "./presentation/user/createUser/createUser";
import { ManageUsers } from "./presentation/user/manageUsers/manageUsers";
import deviceData from "./presentation/user/deviceData/deviceData";
import UserDevices from "./presentation/user/userDevices/userDevices";

export interface Rout {
  isProtected?: boolean;
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  component: any;
}

interface CategoryRout {
  routes: Rout[];
  name: string;
  isSideMenu?: boolean;
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
    isSideMenu: true,
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
    isSideMenu: true,
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
    isSideMenu: true,
  },
  {
    name: "test",
    routes: [
      {
        path: "/test",
        name: "Manage device",
        icon: Person,
        component: deviceData,
      },
    ],
    isSideMenu: true,
  },
  {
    isSideMenu: false,
    name: "subdomains",
    routes: [
      {
        path: "/user/:id/devices",
        name: "user devices",
        component: UserDevices,
      },
      {
        path: "/device/:id",
        name: "device",
        component: deviceData,
      },
    ],
  },
];
