import type { Battery } from "./Battery";
import type { Coordinates } from "./Coordinates";

export class Location {
    public vehiculeId?: string;
    public location?: Coordinates;
    public speed?: number;
    public heading?: number;
    public timestamp?: string;
    public battery?: Battery;
}