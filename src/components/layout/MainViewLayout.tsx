import React from "react";
import { SidebarProvider } from "../ui/sidebar";

interface MainViewLayoutProps {
  sidebar: React.ReactNode;
  map: React.ReactNode;
}

const MainViewLayout: React.FC<MainViewLayoutProps> = ({ sidebar, map }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "30rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
      className="h-screen w-full"
    >
    <div className="flex h-full w-full">
      
      <aside>
        {sidebar}
      </aside>

      <main className="flex-1">
        {map}
      </main>

    </div>
    </SidebarProvider>
  );
};

export default MainViewLayout;