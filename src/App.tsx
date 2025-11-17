import { MapProvider } from "./features/Map/context/MapProvider";
import MainViewLayout from "./components/layout/MainViewLayout";
import RouteSidebar from "./features/sideBar/components/RouteSidebar";
import MapView from "./features/Map/components/MapView";

function App() {

  return (
    <MapProvider>
        <MainViewLayout
          sidebar={<RouteSidebar />} map={<MapView />}/>
    </MapProvider>
  )
}

export default App
