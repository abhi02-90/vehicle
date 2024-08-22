import request from 'supertest';
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
  
      const response = await request(app)
        .post('/graphql')
        .send({ query });
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("vehicles");
      expect(Array.isArray(response.body.data.vehicles)).toBe(true);
    });
});
  