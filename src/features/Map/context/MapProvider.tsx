import React, { createContext, useState } from "react";
import type { RouteData } from "../types";
import type { LatLngExpression } from "leaflet";

interface MapContextType {
  data: RouteData;
  setDistanceKmRoute: (distanceRoute: number) => void;
  setTimeMinutesRoute: (timeRoute: number) => void;
  setLocationPoints: (coordinatesList: LatLngExpression[]) => void;
  setRoutePath: (coordinatesList: LatLngExpression[]) => void;
  setTollboths: (coordinatesList: LatLngExpression[]) => void;
  reset: () => void;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

const initialRouteData: RouteData = {
  distancekMRoute: 0,
  timeMinutesRoute: 0,
  locationPoints: null,
  routePath: null,
  tollboths: null,
};

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<RouteData>(initialRouteData);

  const setDistanceKmRoute = (distanceRoute: number) => setData((prev) => ({ ...prev, distancekMRoute: distanceRoute }))

  const setTimeMinutesRoute = (timeRoute: number) => setData((prev) => ({ ...prev, timeMinutesRoute: timeRoute }))

  const setLocationPoints = (coordinatesList: LatLngExpression[]) =>
    setData((prev) => ({ ...prev, locationPoints: coordinatesList }));

  const setRoutePath = (coordinatesList: LatLngExpression[]) =>
    setData((prev) => ({ ...prev, routePath: coordinatesList }));

  const setTollboths = (coordinatesList: LatLngExpression[]) =>
    setData((prev) => ({ ...prev, tollboths: coordinatesList }));

  const reset = () => setData(initialRouteData);

  return (
    <MapContext.Provider
      value={{
        data,
        setDistanceKmRoute,
        setTimeMinutesRoute,
        setLocationPoints,
        setRoutePath,
        setTollboths,
        reset,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

