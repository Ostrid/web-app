import classNames from "classnames";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiP2pFill } from "react-icons/ri";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { useLocation, useNavigate } from "react-router";

import { getDashboardRoutes } from "../../utils/routes";

export interface MenuItem {
  name: string;
  icon?: React.ElementType;
  action?: () => void;
  position: "bottom" | "top";
  path?: string;
}

const SideNav = ({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Build menu items
  const menuItems: MenuItem[] = useMemo(
    () => [
      ...getDashboardRoutes().reduce((acc, item) => {
        if (item.ignore) return acc;

        const menuItem: MenuItem = {
          ...item,
          position: item.path.includes("Settings") ? "bottom" : "top",
        } as MenuItem;

        acc.push(menuItem);

        return acc;
      }, [] as MenuItem[]),
      {
        name: "Close",
        icon: open
          ? TbLayoutSidebarLeftCollapseFilled
          : TbLayoutSidebarRightCollapseFilled,
        action: () => setOpen(!open),
        position: "bottom",
      },
    ],
    [open],
  );

  const goToRoute = (route: string) => navigate(route);

  return (
    <div className="w-full h-full grid grid-rows-[auto_auto_1fr_auto] content-start justify-start">
      {menuItems.map((item, index) => {
        const isCurrentRoute = item.path
          ? location?.pathname.includes(item.path)
          : false;

        const Icon = item.icon!;
        return (
          <div
            key={item.name}
            id={`item-${item.name}`}
            className={classNames(
              "h-auto flex items-center gap-2 py-2 px-3 text-sm rounded-lg no-select cursor-pointer hover:text-gray-400 dark:hover:text-gray-200",
              {
                "self-end": item.position === "bottom",
                "self-start": item.position === "top",
                "mb-4": index !== menuItems.length - 1,
                "w-[190px] hover:bg-gray-100 dark:hover:bg-gray-900": open,
                "w-auto": !open,
                "!text-[#174ea6] !font-bold": isCurrentRoute,
              },
            )}
            onClick={() => {
              if (item.path) goToRoute(item.path);
              if (item.action) item.action();
            }}
          >
            <span className="h-[25px] aspect-square flex items-center">
              <Icon size="100%" className="text-background dark:text-foreground" />
            </span>
            {open && (
              <motion.p
                animate={{ opacity: [0, 1], y: [5, 0], scale: [0.8, 1] }}
              >
                {item.name}
              </motion.p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SideNav;
