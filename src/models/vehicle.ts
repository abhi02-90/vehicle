// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

import { IVehicle, IVehicleObject } from "../interfaces/vehicle";

// Create a schema for the User model
const vehicleSchema: Schema<IVehicle> = new Schema(
  {
    makeId: {
      type: Number,
      required: true,
    },
    makeName: { 
      type: String, 
      required: true 
    },
    vehicleTypes: [
      new Schema({
        typeId: {
          type: Number,
          required: true,
        },
        typeName: { 
          type: String, 
          required: true 
        },
      }, { _id: false })
    ]
  },
  { 
    timestamps: true 
  }
);

// Create and export the VehicleMake model
export const VehicleModel =  mongoose.model<IVehicle>("vehicle", vehicleSchema);

export const getVehicles = async () => {
  return VehicleModel.find();
}

export const saveVehicleDetails = async (vehicle: IVehicleObject) => {
  return VehicleModel.create(vehicle);
}
