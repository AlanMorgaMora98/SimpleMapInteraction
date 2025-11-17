import { useState, useEffect } from "react"
import LocationListView from "../views/LocationListView"

//TYPES
import type { handleLocationChange, ID, LocationData } from "../types/location"

//CUSTOM HOOK
import { useRouting } from "../../hooks/useRouting"

//CONTEXT PROVIDER
import { useMapContext } from "@/features/Map/context/MapContext"

interface LocationListContainerProps {
  locations: LocationData[]
  setLocations: React.Dispatch<React.SetStateAction<LocationData[]>>
  makeNewLocation: (index: number) => LocationData
}

export default function LocationListContainer({ locations, setLocations, makeNewLocation }: LocationListContainerProps) {

  //CUSTOM HOOK
  const { isLoading, route, getRoute } = useRouting();

  //CONTEXT HOOK
  const { setRoutePath, setLocationPoints, setDistanceKmRoute, setTimeMinutesRoute } = useMapContext()

  const [allowRouting, setAllowRouting] = useState<boolean>(false)

  const handleLocationChange = ({ id, coordinates, selectedState, selectedMunicipality }: handleLocationChange) => {
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, coordinates, selectedState, selectedMunicipality } : l)))
  }

  const addLocation = () => {
    setLocations((prev) => {
      if (prev.length >= 5) return prev
      const next = [...prev, makeNewLocation(prev.length)]
      return next.map((loc, i) => ({ ...loc, label: `Location ${i + 1}` }))
    })
  }

  const removeLocation = (id: ID) => {
    setLocations((prev) => {
      if (prev.length <= 2) return prev
      const filtered = prev.filter((l) => l.id !== id)
      return filtered.map((loc, i) => ({ ...loc, id: i + 1, label: `Location ${i + 1}` }))
    })
  }

  const swapLocations = (i: number, j: number) => {
    setLocations(prev => {
      const next = [...prev];

      // Validar que existan las posiciones
      if (!next[i] || !next[j]) return prev;

      // Intercambiar
      const temp = next[i];
      next[i] = next[j];
      next[j] = temp;

      // Reasignar ids y labels para mantener consistencia
      return next.map((loc, index) => ({
        ...loc,
        id: index + 1,
        label: `Location ${index + 1}`
      }));
    });
  };

  const handleRouting = () => {
    const coordinates = locations
    .filter(loc => loc.coordinates)
    .map(loc => ({
      lat: loc.coordinates!.lat,
      lon: loc.coordinates!.lng,
    }))
    getRoute(coordinates)
  }

  useEffect(() => {
    setAllowRouting(locations.length >= 2 && locations.every(loc => loc.coordinates !== null))
  }, [locations])

  useEffect(() => {
    if (route) {
      setRoutePath(route.routePath)
      const points: [number, number][] = locations
        .filter(l => l.coordinates)
        .map(l => [l.coordinates!.lat, l.coordinates!.lng] as [number, number]);
      setLocationPoints(points)
      setDistanceKmRoute(route.distanceKm)
      setTimeMinutesRoute(route.durationMinutes)
    }
  }, [route])


  return (
    <LocationListView 
      locations={locations}
      allowRouting={allowRouting}
      isLoading={isLoading}
      handleLocationChange={handleLocationChange}
      addLocation={addLocation}
      removeLocation={removeLocation}
      swapLocations={swapLocations}
      handleRouting={handleRouting}
    />
  )
}
