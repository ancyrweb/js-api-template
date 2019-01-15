import App from "../App";
import Validable, {ConstraintBuilderFunction} from "../../src/validation/Validable";

export const ORM = () => App.orm;
export const repository = (type) => App.orm.getRepository(type);

// TODO : better type support here
export const hydrate = (entity, obj) : any => App.orm.connection.manager.create(entity, obj);
export const validator = () => App.validator;
export const validateEntity = (entity: Validable, context?: object) => App.validator.validate(entity, context);
export const validateObject = (entity: object, constraintAccessor: ConstraintBuilderFunction, context?: object) =>
  App.validator.validate(entity, constraintAccessor, context);

export const isProd = () => App.env === "prod";