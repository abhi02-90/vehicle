import { VehicleSchema, saveVehicleTypes } from "../../../schema/vehicle";
import { VehicleModel } from "../../../models/vehicle";
import * as vehicle from "../../../services/vehicle";

describe('Vehicles Schema resolver', () => {
  
  it("Get all saved vehicles from DB", async () => {
    const vehicleDocument = [{
      _id: '5dbff32e367a343830cd2f49',
      makeId: 12858,
      makeName: "#1 Alpine Customs",
      vehicleTypes: [
          {
              typeId: 21,
              typeName: "Trailer"
          }
      ]
    }];
    
    jest.spyOn(VehicleModel,  "find").mockResolvedValue(vehicleDocument);

    const vehicles = await VehicleSchema.query.vehicles.resolve();

    expect(vehicles[0].makeId).toBe(12858);
    expect(vehicles[0].vehicleTypes[0].typeName).toBe("Trailer");
  });

  it("Should return `No Data Found` error from vehicle makes", async () => {
    jest.spyOn(VehicleModel,  "find").mockResolvedValue([]);
    
    const mock = jest.spyOn(vehicle,  "getVehicleMakes");  // spy on foo
    
    mock.mockResolvedValue(
      `<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <Count>0</Count>
        <Message>Response returned successfully</Message>
      </Response>`
    );

    expect(async () => {
      await VehicleSchema.query.vehicles.resolve()
    }).rejects.toThrow("No Data Found");
    
  });

  it("Should return `false` if data not saved successfully", async () => {

    const mockVehicleTypes = jest.spyOn(vehicle,  "getVehicleTypes");  // spy on foo
    
    mockVehicleTypes.mockResolvedValue(
      `<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
         <Count>0</Count>
         <Message>Response returned successfully</Message>
         <SearchCriteria>Make ID: 12745</SearchCriteria>
         <Results>
           <VehicleTypesForMakeIds>
             <VehicleTypeId>9</VehicleTypeId>
             <VehicleTypeName>Low Speed Vehicle (LSV)</VehicleTypeName>
           </VehicleTypesForMakeIds>
         </Results>
       </Response>`
    );

    const saveResponseInfo = await saveVehicleTypes({ 
        Make_ID: 12745, 
        Make_Name: "A.R. SERVICES" 
      });

    expect(saveResponseInfo).toBe(false);

  });

  it("Should return `true` if data saved successfully", async () => {

    jest.spyOn(VehicleModel,  "create").mockResolvedValue([]);

    const mockVehicleTypes = jest.spyOn(vehicle,  "getVehicleTypes");  // spy on foo
    
    mockVehicleTypes.mockResolvedValue(
      `<Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
         <Count>1</Count>
         <Message>Response returned successfully</Message>
         <SearchCriteria>Make ID: 12745</SearchCriteria>
         <Results>
           <VehicleTypesForMakeIds>
             <VehicleTypeId>9</VehicleTypeId>
             <VehicleTypeName>Low Speed Vehicle (LSV)</VehicleTypeName>
           </VehicleTypesForMakeIds>
         </Results>
       </Response>`
    );

    const saveResponseInfo = await saveVehicleTypes({ 
        Make_ID: 12745, 
        Make_Name: "A.R. SERVICES" 
      });

    expect(saveResponseInfo).toBe(true);
  });

});