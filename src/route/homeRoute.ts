import { route } from "../../lib2/helper";

route({ method: "GET", path: "/" }, (req, res) => {
  return res.render('index', { title: "OK" });
});