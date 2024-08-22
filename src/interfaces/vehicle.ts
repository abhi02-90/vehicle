// Import necessary modules
import { Document } from "mongoose";

// Define the interface for VehicleType document
export interface IVehicleType extends Document {
  typeId: number;
  typeName: string;
}

// Define the interface for VehicleMake document
export interface IVehicle extends Document {
  makeId: number;
  makeName: string;
  vehicleTypes: IVehicleType[];
}


export interface IVehiclesMakeApiJsonResponse {
    Response: {
      Count: number;
      Message: string;
      Results: {
        AllVehicleMakes: [{
          Make_ID: number;
          Make_Name: string;
        }]
      }
    }
  }

  export interface IVehicleMakeJsonValue {
    Make_ID: number;
    Make_Name: string;
  }

  export interface IVehicleTypeJsonValue{
    VehicleTypeId: number;
    VehicleTypeName: string;
  }

  export interface IVehicleTypeApiJsonResponse {
    Response: {
      Count: number;
      Message: string;
      Results: { VehicleTypesForMakeIds: IVehicleTypeJsonValue | null  };
    }
  }

  export interface IVehicleTypeObject {
    typeId: number;
    typeName: string;
  }
  
  export interface IVehicleObject {
    makeId: number;
    makeName: string;
    vehicleTypes: IVehicleTypeObject[];
  }