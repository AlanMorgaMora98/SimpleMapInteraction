import { useEffect } from "react";

//LEAFLET MAP
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

//CONTEXT
import { useMapContext } from "../context/MapContext";

//SVG ICONS
import { LocationIcon } from "@/assets/Icons/index";
import ReactDOMServer from "react-dom/server";


import { useTheme } from "@/components/theme-provider";

const center: LatLngExpression = [19.4326, -99.1332];

const mexicoBounds: LatLngBoundsExpression = [
  [14.5, -118.0],
  [32.8, -86.5]
]

// const TollbothIcon = L.icon({
//   iconUrl: tollbothIcon,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40],
// });

interface FitToLocationsProps {
  locationPoints?: L.LatLngExpression[] | null
}

export function FitToLocations({ locationPoints }: FitToLocationsProps) {
  const map = useMap()

  useEffect(() => {
    if (!locationPoints || locationPoints.length === 0) return
    const bounds = L.latLngBounds(locationPoints)
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [locationPoints, map])

  return null
}


const getLocationIcon = (index: number) => {
  const colors = [
    "oklch(0.7 0.2 50)",
    "oklch(0.9 0.18 100)",
    "oklch(0.75 0.2 140)",
    "oklch(0.78 0.18 200)",
    "oklch(0.65 0.22 320)",
  ];

  const color = colors[index % colors.length];

  const iconHTML = ReactDOMServer.renderToString(
    <LocationIcon style={{ color, width: "40px", height: "40px" }} />
  );

  return L.divIcon({
    className: "",
    html: iconHTML,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

};

export default function MapView () {
  const { theme } = useTheme()

  const { data } = useMapContext();

  const isDarkMode =
  theme === "dark" ||
  (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const mapUrl = isDarkMode
  ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

  return (
    <MapContainer
      center={center}
      zoom={7}
      minZoom={5}
      maxBounds={mexicoBounds}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={true}
      className="h-full w-full bg-[#262626]!"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url={mapUrl}
      />

      {data.locationPoints &&
        data.locationPoints.map((locationPoint, index) => (
          <Marker
            key={index}
            position={locationPoint}
            icon={getLocationIcon(index)}
          >
          <Popup>{`Location ${index + 1}`}</Popup>
          </Marker>
      ))}

      {data.routePath &&
        <Polyline
          positions={data.routePath}
          color="#770d0d"
        />
      }

      <FitToLocations
        locationPoints={data.locationPoints}
      />

      </MapContainer>
  )
}

