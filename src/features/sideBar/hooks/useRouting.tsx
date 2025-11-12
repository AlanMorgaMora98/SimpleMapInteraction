import { useState } from "react"

import type { RouteRespose } from "@/services/routing/types/RoutingService"
import { routingRepository } from "@/services/routing/repositories/routingRepository"
import type { OSRMCoordinate } from "@/services/routing/types/osrm"

export const useRouting = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [route, setRoute] = useState<RouteRespose | null>(null)

    const getRoute = async (coordinates: OSRMCoordinate[]) => {
    try {
      setIsLoading(true)
      const response = await routingRepository.getRoute(coordinates)
      setRoute(response)
      setError(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Error performing route calculation")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { route, isLoading, error, getRoute }
}