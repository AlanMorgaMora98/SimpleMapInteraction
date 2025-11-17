import { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import HeaderSideBarView from "./views/HeaderSideBar";
import LocationListContainer from "./containers/LocationListContainer";
import RouteSettingsAndCalculationContainer from "./containers/RouteSettingsAndCalculationContainer";
import FooterSideBarView from "./views/FooterSideBar";
import type { LocationData } from "./types/location";

export default function RouteSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const makeNewLocation = (index: number): LocationData => {
    return {
      id: index + 1,
      label: `Location ${index + 1}`,
      coordinates: null,
      selectedState: null,
      selectedMunicipality: null
    }
  }

  const [locations, setLocations] = useState<LocationData[]>(() => [
    makeNewLocation(0),
    makeNewLocation(1),
  ])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <HeaderSideBarView />
      </SidebarHeader>

      <SidebarContent>
        <LocationListContainer locations={locations} setLocations={setLocations} makeNewLocation={makeNewLocation} />
        <RouteSettingsAndCalculationContainer />
      </SidebarContent>
  
      <SidebarFooter>
          <FooterSideBarView />
      </SidebarFooter>
    </Sidebar>
  )
}