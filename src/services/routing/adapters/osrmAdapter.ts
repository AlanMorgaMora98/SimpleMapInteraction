import type { OSRMRouteResponse } from "../types/osrm"
import type { RouteRespose } from "../types/RoutingService"

export class OsrmAdapter {
  static toRoute(response: OSRMRouteResponse): RouteRespose {
    const route = response.routes[0]
    const distanceKm = route.distance / 1000
    const durationMin = route.duration / 60
    const coordinates: [number, number][] = route.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);

    return {
      distanceKm: Number(distanceKm.toFixed(2)),
      durationMinutes: Number(durationMin.toFixed(2)),
      routePath: coordinates
    }
  }
}
