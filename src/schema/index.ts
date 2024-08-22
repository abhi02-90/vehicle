import {
  GraphQLSchema,
  GraphQLObjectType,
} from "graphql";
import { VehicleSchema } from "./vehicle";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => VehicleSchema.query,
});

export default new GraphQLSchema({
  query: RootQuery,
});
