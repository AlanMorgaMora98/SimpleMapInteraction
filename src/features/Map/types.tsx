import type { LatLngExpression } from 'leaflet';

export interface RouteData {
    distancekMRoute?: number,
    timeMinutesRoute?: number,
    locationPoints?: LatLngExpression[] | null,
    routePath?: LatLngExpression[] | null,
    tollboths?: LatLngExpression[] | null
}


