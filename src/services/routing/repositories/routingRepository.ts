// src/api/repositories/osrmRepository.ts
import { serviceClientRouting } from "../ServiceClientRouting"
import { OsrmAdapter } from "../adapters/osrmAdapter"
import type { OSRMCoordinate, OSRMRouteResponse } from "../types/osrm"
import type { RouteRespose } from "../types/IRoutingService"

export class RoutingRepository {
  private profile = "car"

  async getRoute(coordinates: OSRMCoordinate[]): Promise<RouteRespose> {
    if (coordinates.length < 2)
      throw new Error("Se necesitan al menos dos coordenadas")

    const coordsString = coordinates
      .map(c => `${c.lon},${c.lat}`)
      .join(";")

    const endpoint = `/route/v1/${this.profile}/${coordsString}?overview=full&geometries=geojson&steps=true`

    const rawResponse = await serviceClientRouting.get<OSRMRouteResponse>(endpoint)
    return OsrmAdapter.toRoute(rawResponse)
  }
}

export const routingRepository = new RoutingRepository()