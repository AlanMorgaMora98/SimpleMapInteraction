import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar";

interface MainViewLayoutProps {
  sidebar: React.ReactNode;
  map: React.ReactNode;
}

const MainViewLayout: React.FC<MainViewLayoutProps> = ({ sidebar, map }) => {

  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "clamp(25rem, 30vw, 30rem)",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
      className="h-screen w-full"
    >
    <div className="flex h-full w-full">

      {sidebar}
      
      <SidebarInset className="flex flex-col flex-1">
        
        <SidebarTrigger 
          className="absolute top-20 left-3 z-1000 bg-foreground text-secondary backdrop-blur-md rounded-md p-2"
        />
        <main className="flex-1">
          {map}
        </main>
      </SidebarInset>

    </div>

    </SidebarProvider>
  );
};

export default MainViewLayout;




