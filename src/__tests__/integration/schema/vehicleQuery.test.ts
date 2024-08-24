import request from 'supertest';
import { VehicleModel } from "../../../models/vehicle";
import app from "../../../";

describe('Vehicle GraphQL API', () => {
    it('should return vehicle details', async () => {
      const query = `
        query {
          vehicles {
            makeId
            makeName
            vehicleTypes {
              typeId
              typeName
            }
          }
        }
      `;
    
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

      const response = await request(app)
        .post('/graphql')
        .send({ query });
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("vehicles");
      expect(Array.isArray(response.body.data.vehicles)).toBe(true);
    });
});
  