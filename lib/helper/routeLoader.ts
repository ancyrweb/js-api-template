import Server, {ServerRouteCallback, ServerRouteConfig} from "../http/Server";

const routes = [];

export const route = (config: ServerRouteConfig, callback: ServerRouteCallback) => routes.push({ config, callback });
export const loadRoutes = (app: Server) => {
  routes.forEach(obj => {
    app.route(obj.config, obj.callback);
  })
};