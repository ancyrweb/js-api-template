const ServiceDataHolder = {};

export function ServiceID(id) {
  return function(target, _) {
    target.id = id;
    ServiceDataHolder[id] = {};
  }
}

export function setServiceProperty(target, key, value) {
  const id = typeof target === "function" ? target.prototype.id : target.id;
  ServiceDataHolder[id][key] = value;
}

export function getServiceProperty(target, key) {
  const id = typeof target === "function" ? target.prototype.id : target.id;

  if (!ServiceDataHolder[id])
    return undefined;

  return ServiceDataHolder[id][key];
}

export function getServiceID(target) {
  return target.prototype.id
}