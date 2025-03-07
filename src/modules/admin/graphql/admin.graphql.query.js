import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { findAllUsersAndCompanies } from "./admin.graphql.service.js";
import { allUsersResponseAndCompanies } from "../graphql/types/admin.types.response.js";
import { allMiddleware } from './../../../graphql/allfunctions.js';

import { isAuthenticated } from './../../../graphql/authentication.graphql.js';
import { roles } from "../../../utils/enums/allEnums.js";

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
        resolve: allMiddleware(
            findAllUsersAndCompanies,
            isAuthenticated(roles.admin)
        )
    }
};
