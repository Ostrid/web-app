import React, { useState } from "react";

import light from "../../assets/logo/logo_full_clear_observer_italic.png";
import dark from "../../assets/logo/logo_full_clear_observer_light.png";
import { useTheme } from "../../hooks/useTheme";
import { ThemeToggle } from "../ThemeToggle";
import ToastContainer from "../ToastContainer";
import SideNav from "./SideNav";
import { ConnectButton } from "@mysten/dapp-kit-react";

interface Props extends React.PropsWithChildren {
  children: React.ReactElement;
}

const Dashboard: React.FC<Props> = ({ children }) => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  return (
    <div className="w-full h-dvh flex flex-col overflow-hidden bg-foreground dark:bg-background  text-background dark:text-gray-400">
      <div className="bg-transparent pt-4 pb-1 px-4 flex items-center w-full h-[8dvh]">
        <div className="h-full w-auto mr-auto flex items-center">
          <img
            src={theme === "dark" ? dark : light}
            className="h-full object-cover w-auto aspect-auto"
            alt="logo"
          />
        </div>
        <div className="h-full w-auto mr-2">
          <ConnectButton />
        </div>
        <div className="h-full w-auto aspect-square cursor-pointer ">
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-auto flex-1 overflow-y-hidden flex items-center justify-between pl-4 pr-0 py-2">
        <div className={"h-full py-2 relative w-auto"}>
          <SideNav open={sideNavOpen} setOpen={setSideNavOpen} />
        </div>
        <div className="h-full w-auto overflow-hidden flex items-center justify-center flex-1 p-2">
          {children}
        </div>
      </div>
 
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
