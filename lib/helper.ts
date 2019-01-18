import App from "./App";
import Logger from "./logger/Logger";
import Validable, {ConstraintBuilderFunction} from "./validation/Validable";
import AppOrm from "./orm/ORM";
import Validator from "./validation/Validator";

export const hook = (name, ...data) => App.hook(name, ...data);
export const route = (config, callback) => App.hook("route", config, callback);
export const service = (name: string) => App.service(name);
export const validator = () : Validator => App.service("validator");

export const logInfo = (msg, ...params) => (App.service("logger") as Logger).logger.info(msg);
export const logWarning = (msg, ...params) => (App.service("logger") as Logger).logger.warning(msg);
export const logError = (msg, ...params) => (App.service("logger") as Logger).logger.error(msg);

export const ORM = () : AppOrm => App.service("orm");
export const repository = (type) => ORM().getRepository(type);

export const hydrate = (entity, obj) : any => ORM().connection.manager.create(entity, obj);
export const validateEntity = (entity: Validable, context?: object) => validator().validate(entity, context);
export const validateObject = (entity: object, constraintAccessor: ConstraintBuilderFunction, context?: object) =>
  validator().validate(entity, constraintAccessor, context);

export const isProd = () => App.env === "prod";
