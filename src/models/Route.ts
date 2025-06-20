import type { Stop } from "./Stop";

export class Route {
    public routeId?: string;
    public vehicleId?:string;
    public status?: string;
    public currentStopIndex?: number;
    public stops?: Stop;
}