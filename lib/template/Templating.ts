import Server from "../http/Server";
import * as express from 'express';

export interface TemplateConfig {
  viewsPath: string,
  publicPath: string,
}
class Templating {
  private viewsPath: string;
  private publicPath: string;

  constructor(config: TemplateConfig) {
    this.viewsPath = config.viewsPath;
    this.publicPath = config.publicPath;
  }

  public integrate(server: Server) {
    server.set("view engine", "ejs");
    server.set("views", this.viewsPath);
    server.app.use(express.static(this.publicPath));

  }
}

export default Templating;