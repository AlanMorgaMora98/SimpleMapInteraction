import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainViewLayoutProps {
  sidebar: React.ReactNode;
  map: React.ReactNode;
}

const MainViewLayout: React.FC<MainViewLayoutProps> = ({ sidebar, map }) => {

  const isMobile = useIsMobile()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "clamp(400px, 30vw, 30rem)",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
    >

      {sidebar}
      
      <SidebarInset className="flex flex-col flex-1">
        {isMobile && (
          <SidebarTrigger 
            className="absolute top-20 left-3 z-1000 bg-foreground text-secondary backdrop-blur-md rounded-md p-2"
          />
        )}
        <main className="flex-1">
          {map}
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
};

export default MainViewLayout;




