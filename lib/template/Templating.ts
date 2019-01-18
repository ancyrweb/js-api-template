import Server from "../../lib/http/Server";
import * as express from 'express';
import { ServiceID } from "../decorator/ServiceDecorator";
import { service } from "../helper";

class Templating {
  @ServiceID("templating") public id;

  private viewsPath: string;
  private publicPath: string;

  constructor(config) {
    this.viewsPath = config.paths.views;
    this.publicPath = config.paths.public;
  }

  initialize() {
    const server = service("http") as Server;
    server.set("view engine", "ejs");
    server.set("views", this.viewsPath);
    server.app.use(express.static(this.publicPath));
  }
}

export default Templating;