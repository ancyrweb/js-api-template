import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const schemas = [];
const resolvers = [];

export const gqlSchema = (schema) => {
  schemas.push(Array.isArray(schema) ? schema[0] : schema);
};
export const gqlResolver = (resolver) => resolvers.push(resolver);
export const gqlConfig = () => {
  return {
    typeDefs: mergeTypes(schemas, { all: true }),
    resolvers: mergeResolvers(resolvers),
  };
};