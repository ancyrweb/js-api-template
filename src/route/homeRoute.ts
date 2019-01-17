import { route } from "../../lib/helper/routeLoader";

route({ method: "GET", path: "/" }, (req, res) => {
  return "Oh ok!";
});