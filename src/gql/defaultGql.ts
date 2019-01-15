import { gqlResolver, gqlSchema } from "../../lib/helper/gqlLoader";

gqlSchema`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;

gqlResolver({
  Query: {

  },
  Mutation: {

  }
});