import { getServiceID } from "./decorator/ServiceDecorator";
import {callHook, respondsToHook} from "./decorator/HookHandlerDecorator";

class App<ConfigType> {
  services: object = {};
  hooks: {[key: string]: any[]} = {};

  async init(config: ConfigType) {
    Object.keys(this.services).forEach(name => {
      this.services[name] = new this.services[name](config);
    });

    Object.keys(this.hooks).forEach(name => {
      Object.keys(this.services).forEach(serviceName => {
        if (respondsToHook(this.services[serviceName], name)) {
          this.hooks[name].forEach(params => {
            callHook(this.services[serviceName], name, params);
          })
        }
      })
    });

    for (let name of Object.keys(this.services)) {
      if (typeof this.services[name].initialize === "function") {
        this.services[name].initialize();
      }
    }

    for (let name of Object.keys(this.services)) {
      if (typeof this.services[name].initializeAsync === "function") {
        await this.services[name].initializeAsync();
      }
    }
  }

  add(service: any) {
    this.services[getServiceID(service)] = service;
    return this;
  }

  service(name: string) {
    return this.services[name];
  }

  hook(name, ...data) {
    if (!this.hooks[name]) {
      this.hooks[name] = [];
    }

    this.hooks[name].push(data);
  }
}

export default new App();