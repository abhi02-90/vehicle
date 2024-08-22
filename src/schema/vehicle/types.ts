import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
  } from "graphql";

  const VehicleTypesType = new GraphQLObjectType({
    name: "vehicleTypes",
    fields: () => ({
      typeId: { type: GraphQLID },
      typeName: { type: GraphQLString },
    }),
  });
  
export const VehicleType = new GraphQLObjectType({
    name: "vehicle",
    fields: () => ({
      makeId: { type: GraphQLID },
      makeName: { type: GraphQLString },
      vehicleTypes: {
        type: new GraphQLList(VehicleTypesType),
      },
    }),
  });