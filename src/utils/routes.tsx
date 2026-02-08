import { TbLayoutDashboardFilled } from "react-icons/tb";

import Home from "../screens/observer/Home.tsx";
import Landing from "../screens/main/Landing.tsx";
import { IoSettings } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";

export type RouteType = {
  path: string;
  component: React.ComponentType;
  icon?: Element | any;
  name?: string;
  dashboard?: boolean;
  ignore?: boolean;
  isLanding?: boolean;
};

export const getDashboardRoutes = () => {
  return [
    {
      path: "/observer/home",
      component: Home,
      icon: TbLayoutDashboardFilled,
      name: "Observer",
      dashboard: true,
    },
    {
      path: "/observer/agents",
      component: ()=>{},
      icon: RiRobot2Fill,
      name: "Agents",
      dashboard: true,
    },
    {
      path: "/observer/settings",
      component: ()=>{},
      icon: IoSettings,
      name: "Settings",
      dashboard: true,
    },
  ];
};

export const getMainRoutes = (): RouteType[] => {
  return [
    { path: "/", component: Landing, isLanding: true },
    ...getDashboardRoutes(),
  ];
};
