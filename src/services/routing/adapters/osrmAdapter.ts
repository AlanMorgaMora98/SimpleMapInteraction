import type { OSRMRouteResponse } from "../types/osrm"
import type { RouteRespose } from "../types/IRoutingService"

export class OsrmAdapter {
  static toRoute(response: OSRMRouteResponse): RouteRespose {
    const route = response.routes[0]
    const distanceKm = route.distance / 1000
    const durationMin = route.duration / 60
    const points = route.geometry.coordinates.map(([lon, lat]) => [lat, lon])

    console.log(points)

    return {
      distanceKm: Number(distanceKm.toFixed(2)),
      durationMinutes: Number(durationMin.toFixed(2)),
      directionsList: [12, 21],
      routePath: [12, 21]
    }
  }
}
