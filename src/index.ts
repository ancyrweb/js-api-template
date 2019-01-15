import "reflect-metadata";
import App from "./lib/App";

App.initialize(process.env.PORT ? parseInt(process.env.PORT, 10) : 4999);
App.start();