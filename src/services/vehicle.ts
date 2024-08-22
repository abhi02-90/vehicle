import { environmentConfig } from "../config";

const { VEHICLE_API } = environmentConfig;

export const getVehicleMakes = async () => {
  return fetch(`${VEHICLE_API.URL}/getallmakes?format=XML`).then(data => data.text());  
}

export const getVehicleTypes = async (makeId: number) => {
  return fetch(`${VEHICLE_API.URL}/GetVehicleTypesForMakeId/${makeId}`).then(data => data.text());  
}