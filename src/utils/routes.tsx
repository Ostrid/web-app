import { TbLayoutDashboardFilled } from "react-icons/tb";

import Home from "../screens/observer/Home.tsx";
import Landing from "../screens/main/Landing.tsx";

export type RouteType = {
  path: string;
  component: React.ComponentType;
  icon?: Element | any;
  name?: string;
  dashboard?: boolean;
  p2p?: boolean;
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
  ];
};

export const getMainRoutes = (): RouteType[] => {
  return [
    { path: "/", component: Landing, isLanding: true },
    ...getDashboardRoutes(),
  ];
};
