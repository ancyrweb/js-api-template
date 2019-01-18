import { getServiceID } from "./decorator/ServiceDecorator";
import {callHook, respondsToHook} from "./decorator/HookHandlerDecorator";

export type ServiceConfigurator = (config: any) => any[];

class App {
  services: {[key: string]: {
      klass: any,
      obj: any
      configurator?: ServiceConfigurator
    }} = {};

  hooks: {[key: string]: any} = {};

  public env: "dev" | "prod";

  async init(config: any) {
    this.env = config.parameters.ENV;

    Object.keys(this.services).forEach(name => {
      if (typeof this.services[name].configurator === "function") {
        let params = this.services[name].configurator(config);
        this.services[name].obj = new this.services[name].klass(...params);
        return;
      }

      this.services[name].obj = new this.services[name].klass(config);
    });

    Object.keys(this.hooks).forEach(name => {
      Object.keys(this.services).forEach(serviceName => {
        if (respondsToHook(this.services[serviceName].obj, name)) {
          this.hooks[name].forEach(params => {
            callHook(this.services[serviceName].obj, name, params);
          })
        }
      })
    });

    for (let name of Object.keys(this.services)) {
      if (typeof this.services[name].obj.initialize === "function") {
        this.services[name].obj.initialize();
      }
    }

    for (let name of Object.keys(this.services)) {
      if (typeof this.services[name].obj.initializeAsync === "function") {
        await this.services[name].obj.initializeAsync();
      }
    }
  }

  add(service: any, configurator?: ServiceConfigurator) {
    this.services[getServiceID(service)] = {
      klass: service,
      obj: null,
      configurator: configurator,
    };
    return this;
  }

  service(name: string) {
    return this.services[name].obj;
  }

  hook(name, ...data) {
    if (!this.hooks[name]) {
      this.hooks[name] = [];
    }

    this.hooks[name].push(data);
  }
}

export default new App();