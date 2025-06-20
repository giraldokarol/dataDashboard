import axios from 'axios';
import { Vehicule } from '../models/Vehicule';
import { Location } from '../models/Location';
import type { Route } from '../models/Route';

const URL_API = "https://virtserver.swaggerhub.com/karolgiraldo-d5d/TruckTrackingAPI/1.0.0/vehicles/";

export const vehicleService = {
    //get Vehicule By Id
    async getVehicule(id:string): Promise<Vehicule>{
        try {
            const response = await axios.get(`${URL_API}${id}`);
            const data = await response.data as Vehicule;
            return data;
        }catch(error){
            console.error("Error fetching Vehicle", error);
            throw error;
        }
    },

    //get Vehicule Location by Id (Matricule)
    async getLocation(id:string): Promise<Location>{
        try{
            const response = await axios.get(`${URL_API}${id}/location`);
            const data = await response.data as Location;
            return data;
        }catch(error){
            console.error("Error fetching Real Time Location", error);
            throw error;
        }
    },

    //get vehicle route by By Id
    async getRoute(id:string): Promise<Route> {
        try{
            const response = await axios.get(`${URL_API}${id}/route`);
            const data = await response.data as Route;
            return data;
        }catch(error){
            console.error("Error fetching Routes", error);
            throw error;
        }
    }
}