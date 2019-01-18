import { User } from "../orm/entity/User";
import { CombinedGQLParameters, pipeline } from "../helper/controller";
import PasswordHasher from "../../lib/security/PasswordHasher";
import { hook, repository } from "../../lib/helper";

hook("gql-schema", `
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
`);

hook("gql-query", "users", (parent, args, context, info) => {
  return repository(User).find();
});
hook("gql-query", "user", (parent, args, context, info) => {
  return repository(User).findOne(args.id);
});
hook("gql-mutation", "register", pipeline(
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
));
