import { route } from "../../lib/helper/routeLoader";

route({ method: "GET", path: "/" }, (req, res) => {
  return res.render('index', { title: "OK" });
});