import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import HeaderSideBarView from "./views/HeaderSideBar";
import LocationListContainer from "./containers/LocationListContainer";
import RouteSettingsAndCalculationContainer from "./containers/RouteSettingsAndCalculationContainer";
import FooterSideBarView from "./views/FooterSideBar";

export const RouteSidebar = () => {

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

export default RouteSidebar;