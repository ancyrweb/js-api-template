import {hook} from "../../lib/helper";

hook("gql-schema", `
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`);