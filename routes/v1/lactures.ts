import * as express from "express";
import LactureController from "../../controllers/v1/lacture";
import adminAuth from "../../middlewares/admin/admin.auth";

const route = express.Router();
// get all lacture
route.post("/login", LactureController.login);
route.put("/:id", LactureController.update);
// route.use(adminAuth);
route.get("", adminAuth, LactureController.getAll);
route.post("", adminAuth, LactureController.addone);
route.put("/active/:id", adminAuth, LactureController.Undelete);
route.delete("/:id", adminAuth, LactureController.delete);

export default route;
