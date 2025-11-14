export interface RoutingService {
    getRoute(coordinates: [number, number][]): Promise<RouteRespose>;
}

export interface RouteStep {
  instruction: string;
  street: string;
  distanceMtrs: number;
  duration: number;
}

export interface RouteRespose{
    distanceKm: number,
    durationMinutes: number,
    routePath: [number, number][]
}