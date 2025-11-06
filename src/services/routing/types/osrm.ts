export interface OSRMCoordinate {
  lat: number
  lon: number
}

export interface OSRMRouteResponse {
  code: string
  routes: {
    distance: number
    duration: number
    geometry: {
      coordinates: [number, number][]
    }
    legs: Array<{
      summary: string
      steps: Array<{
        name: string
        distance: number
        duration: number
        maneuver: {
          instruction?: string
          type?: string
        }
      }>
    }>
  }[]
  waypoints: Array<{
    name: string
    location: [number, number]
  }>
}
