import App from "../App";

export const ORM = () => App.orm;
export const repository = (type) => App.orm.getRepository(type);
export const hydrate = (entity, obj) => App.orm.connection.manager.create(entity, obj);