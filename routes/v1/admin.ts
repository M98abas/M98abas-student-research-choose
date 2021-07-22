import * as express from "express";
import AdminController from "../../controllers/v1/admin";
import adminAuth from "../../middlewares/admin/admin.auth";

const route = express.Router();
// get all lacture
route.post("/login", AdminController.login);
// route.use(adminAuth);
route.get("", adminAuth, AdminController.getAll);
route.post("/register", adminAuth, AdminController.register);
route.delete("/:id", adminAuth, AdminController.delete);
route.put("/active/:id", adminAuth, AdminController.Undelete);

export default route;
