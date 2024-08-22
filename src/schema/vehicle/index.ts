import { GraphQLList } from "graphql";
import Bottleneck from "bottleneck";

import { VehicleType } from "./types";
import { getVehicles, saveVehicleDetails } from "../../models/vehicle";
import { getVehicleMakes, getVehicleTypes } from "../../services/vehicle";
import { 
  IVehicleMakeJsonValue,
  IVehiclesMakeApiJsonResponse, 
  IVehicleTypeJsonValue, 
  IVehicleTypeApiJsonResponse, 
  IVehicleTypeObject 
} from "../../interfaces/vehicle";
import xmlToJson from "../../utils/xmlToJson";

/**
 * Strategy for calling vehicle api for rate limit
 * reservoir - Initial value
 * reservoirRefreshAmount - refill after refresh interval
 * reservoirRefreshInterval - increase quota by reservoirRefreshAmount after specified time
 * maxConcurrent - Number of concurrent requests
 * minTime - min time to execute one job
 */
const limiter = new Bottleneck({
  reservoir: 200,
  reservoirRefreshAmount: 200,
  reservoirRefreshInterval: 1000, 
  maxConcurrent: 2000,
  minTime: 90,
});

export const saveVehicleTypes = async (makeDetails: IVehicleMakeJsonValue): Promise<boolean> => {
  try {
    const vehicleTypesDetail = await getVehicleTypes(makeDetails.Make_ID);
    const vehicleTypesJson: IVehicleTypeApiJsonResponse = xmlToJson(vehicleTypesDetail);
    
    if (vehicleTypesJson.Response && !vehicleTypesJson.Response.Count) {
      throw new Error(`No Data Found`);
    }

    const vehicleTypes: IVehicleTypeObject[] = vehicleTypesJson.Response.Count > 1 && 
      Array.isArray(vehicleTypesJson.Response.Results.VehicleTypesForMakeIds) ?
        vehicleTypesJson.Response.Results.VehicleTypesForMakeIds.map(
          (data: IVehicleTypeJsonValue) => ({
            typeId: data.VehicleTypeId,
            typeName: data.VehicleTypeName,
          })
        ) :
        [{
          typeId: vehicleTypesJson.Response.Results.VehicleTypesForMakeIds.VehicleTypeId, 
          typeName: vehicleTypesJson.Response.Results.VehicleTypesForMakeIds.VehicleTypeName 
        }];

    await saveVehicleDetails({
      makeId: makeDetails.Make_ID,
      makeName: makeDetails.Make_Name,
      vehicleTypes,
    });
    return Promise.resolve(true);

  } catch (error) {
    console.log(`Error for saving vehicle record for ${makeDetails.Make_ID}`, error.message);
    return Promise.resolve(false);
  }
}

const query = {
  vehicles: {
    type: GraphQLList(VehicleType),
    resolve: async () => {
      try {
        const vehicles = await getVehicles();
        if (vehicles.length) {
          return vehicles;
        }
        const vehiclesMakeDetail = await getVehicleMakes();
        const vehiclesMakeJson: IVehiclesMakeApiJsonResponse = xmlToJson(vehiclesMakeDetail);
        
        if (vehiclesMakeJson.Response && !vehiclesMakeJson.Response.Count) {
          throw new Error("No Data Found");
        }
        
        const vehiclesMake = vehiclesMakeJson.Response.Results.AllVehicleMakes;
        await Promise.all(
          vehiclesMake.map(
            makeDetails => limiter.schedule(() => saveVehicleTypes(makeDetails))
          )
        );
        return getVehicles();

      } catch (error) {
        console.log(`Error in vehicles api ${error.message}`)
        throw new Error(error.message);
      }
    },
  },
};

export const VehicleSchema = {
  query
};