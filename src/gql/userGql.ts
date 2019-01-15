import { hydrate, repository } from "../../lib/helper/services";
import { User } from "../orm/entity/User";
import { gqlResolver, gqlSchema } from "../../lib/helper/gqlLoader";
import { successResponse } from "../../lib/helper/response";

gqlSchema`
  type User {
    id: Int
    emailAddress: String
  }
  type RegisterResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }
  input RegisterInput {
    emailAddress: String!
    password: String!
  }
  
  # === #
  
  type Query {
    users: [User]
    user(id: Int): User
  }
  
  type Mutation {
    register(input: RegisterInput): RegisterResponse
  }
`;

gqlResolver({
  Query: {
    users(parent, args, context, info) {
      return repository(User).find();
    },
    user(parent, args, context, info) {
      return repository(User).findOne(args.id);
    }
  },
  Mutation: {
    async register(parent, args, context, info) {
      console.log(args);
      const user = hydrate(User, args.input);
      await repository(User).save(user);
      return successResponse({user}, "User successfully registered");
    }
  }
});