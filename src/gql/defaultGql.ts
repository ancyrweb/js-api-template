import { gqlResolver, gqlSchema } from "../../lib/helper/gqlLoader";
import {hook} from "../../lib2/helper";

hook("gql-schema", `
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`);

hook("gql-resolver", {
  Query: {

  },
  Mutation: {

  }
});