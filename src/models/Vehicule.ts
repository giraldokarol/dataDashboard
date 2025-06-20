import { Driver } from "./Driver";
import { Battery } from "./Battery";
import { Coordinates } from "./Coordinates";

export class Vehicule {
    public vehicleId?: string;
    public model?: string;
    public licensePlate?: string;
    public driver?: Driver;
    public battery?: Battery;
    public speed?: number;
    public location?: Coordinates;
    public status?: string;
}