import { route } from "../../lib/helper";

route({ method: "GET", path: "/" }, (req, res) => {
  return res.render('index', { title: "OK" });
});