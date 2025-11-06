export interface RoutingService {
    getRoute(coordinates: [number, number][]): Promise<RouteRespose>;
}

export interface RouteRespose{
    distanceKm: number,
    durationMinutes: number,
    directionsList: [number, number],
    routePath: [number, number]
}