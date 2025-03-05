import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { findAllUsersAndCompanies } from "./admin.graphql.service.js";
import { allUsersResponseAndCompanies } from "../graphql/types/admin.types.response.js";

export const adminQuery = {
    allUsersAndCompanies: {
        type: new GraphQLObjectType({
            name: "AllUsersAndCompaniesResponse",
            fields: {
                success: { type: GraphQLBoolean },
                status: { type: GraphQLInt },
                results: { type: allUsersResponseAndCompanies }
            }
        }),
        resolve: findAllUsersAndCompanies
    }
};
