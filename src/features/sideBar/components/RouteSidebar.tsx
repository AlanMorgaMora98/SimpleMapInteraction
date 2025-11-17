import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import HeaderSideBarView from "./views/HeaderSideBar";
import LocationListContainer from "./containers/LocationListContainer";
import RouteSettingsAndCalculationContainer from "./containers/RouteSettingsAndCalculationContainer";
import FooterSideBarView from "./views/FooterSideBar";

export default function RouteSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
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