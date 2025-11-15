import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar"
import { SheetDescription, Sheet, SheetHeader, SheetContent, SheetFooter, SheetTitle } from "@/components/ui/sheet"
import HeaderSideBarView from "./views/HeaderSideBar";
import LocationListContainer from "./containers/LocationListContainer";
import RouteSettingsAndCalculationContainer from "./containers/RouteSettingsAndCalculationContainer";
import FooterSideBarView from "./views/FooterSideBar";

export const RouteSidebar = () => {

  const { isMobile, openMobile, setOpenMobile } = useSidebar()


  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>

        {openMobile && <div className="w-77"></div>}
        
        <SheetContent
          side="left"
          className="w-77 p-4 bg-sidebar text-sidebar-foreground"
        >
          <SheetHeader>
            <SheetTitle>
              <HeaderSideBarView />
            </SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto flex flex-col">
          <LocationListContainer />
          <RouteSettingsAndCalculationContainer />
          
          </div>
          <SheetFooter>
            <FooterSideBarView />
          </SheetFooter>

        </SheetContent>

      </Sheet>
    )
  } else {
    return (
      <Sidebar>
        <SidebarHeader>
          <HeaderSideBarView />
        </SidebarHeader>

        <SidebarContent>
          <LocationListContainer />
          <RouteSettingsAndCalculationContainer />
        </SidebarContent>
    
        <SidebarFooter>
            <FooterSideBarView />
        </SidebarFooter>
      </Sidebar>
    )
  }
}

export default RouteSidebar;