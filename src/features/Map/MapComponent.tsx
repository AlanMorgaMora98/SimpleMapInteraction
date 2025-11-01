import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "../../styles/map.css"

const center: LatLngExpression = [19.4326, -99.1332];

export default function MapComponent() {

    return (
        <MapContainer
            center={center}
            zoom={6}
            minZoom={6}
            scrollWheelZoom={true}
            className="map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
            />

        </MapContainer>
    )
}


