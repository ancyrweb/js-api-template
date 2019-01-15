import {hydrate, repository, validateEntity} from "../../lib/helper/services";
import { User } from "../orm/entity/User";
import { gqlResolver, gqlSchema } from "../../lib/helper/gqlLoader";
import {errorResponse, successResponse} from "../../lib/helper/response";
import Hydrate from "../../lib/decorator/Hydrate";
import {CombinedGQLParameters, pipeline} from "../../lib/helper/controller";
import PasswordHasher from "../../lib/security/PasswordHasher";

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
    register: pipeline(
      pipeline.forEntity(User),
      pipeline.hydrate(),
      pipeline.validate(),
      async (args: CombinedGQLParameters) => {
        const entity = pipeline.helper.extractEntity(args) as User;
        entity.password = await PasswordHasher.hash(entity.password);
        return args;
      },
      pipeline.save(),
      pipeline.serveEntity("user", "User successfully registered")
    ),
  }
});