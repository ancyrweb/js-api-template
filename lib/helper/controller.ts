import { pipe } from 'ramda';
import {hydrate, isProd, repository, validateEntity} from "./services";
import {User} from "../../src/orm/entity/User";
import {errorResponse, successResponse} from "./response";
import {logError} from "./log";

export type CombinedGQLParameters = {
  parent: any,
  args: any,
  context: any,
  info: any,
  extra: any,
}

export type EndOfQueue = any;
export type ControllerMiddleware = (CombinedGQLParameters) => CombinedGQLParameters | EndOfQueue;
export const pipeline = (...middlewares : Array<ControllerMiddleware>) => async (parent: any, args: any, context: any, info: any) => {
  let aggr = pipeline.combineGqlParameters(parent, args, context, info);
  let response;

  for (let mw of middlewares) {
    response = await mw(aggr);
    if (response !== aggr)
      return response;
  }

  return response;
};

pipeline.combineGqlParameters = (parent, args, context, info) : CombinedGQLParameters => ({ parent, args, context, info, extra: {} });
pipeline.forEntity = <T>(klass: new() => T) => (params : CombinedGQLParameters) => {
  params.extra.entityClass = User;
  return params;
};

pipeline.hydrate = <T>(klass?: new() => T) => (params : CombinedGQLParameters & { extra: { entityKlass?: new() => T }}) => {
  params.extra.entity = hydrate(params.extra.entityClass || klass, params.args.input);
  return params;
};

pipeline.validate = () => (params : CombinedGQLParameters & { extra: { entity: any }}) => {
  const validation = validateEntity(params.extra.entity);
  if (validation.success === false) {
    return errorResponse(validation.message);
  }

  return params;
};

pipeline.save = <T>(klass?: new() => T) => async (params : CombinedGQLParameters) => {
  try {
    await repository(params.extra.entityClass || klass).save(params.extra.entity);
  } catch (e) {
    logError(e.message, e);

    if (isProd()) {
      return errorResponse("Cannot persist data", 500);
    } else {
      return errorResponse(e.message, 400);
    }
  }
  return params;
};

pipeline.serveEntity = (key, message) => (params: CombinedGQLParameters) => {
  return successResponse({ [key]: params.extra.entity }, message);
};

pipeline.helper = {
  extractEntity: (args: CombinedGQLParameters) => args.extra.entity
};