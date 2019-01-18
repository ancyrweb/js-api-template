import Server, {ServerRouteCallback, ServerRouteConfig} from "../http/Server";

const routes = [];
const locals = {};

export const route = (config: ServerRouteConfig, callback: ServerRouteCallback) => routes.push({ config, callback });
export const loadRoutes = (app: Server) => {
  routes.forEach(obj => {
    app.route(obj.config, obj.callback);
  });
};

export const tplHelper = (name: string, fn: (...args: any[]) => any) => locals[name] = fn;
export const tplVar = (name: string, data: any) => locals[name] = data;

export const loadTemplatingHelpers = (app: Server) => {
  app.mergeLocals(locals);
};