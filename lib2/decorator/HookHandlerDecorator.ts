import {getServiceProperty, setServiceProperty} from "./ServiceDecorator";

export default function Hook(name: string) {
  return function(target, methodName) {
    let hooks = getServiceProperty(target, "hooks");
    if (!hooks) {
      hooks = {};
    }

    hooks[name] = methodName;
    setServiceProperty(target,"hooks", hooks);
  }
};

export function respondsToHook (service, hookName) {
  const hooks = getServiceProperty(service, "hooks");
  if (!hooks)
    return false;

  return hooks[hookName] != undefined;
}

export function callHook (service, hookName, params) {
  const methodName = getServiceProperty(service, "hooks")[hookName];
  service[methodName](...params);
}