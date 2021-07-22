import * as express from "express";
import StudentController from "../../controllers/v1/students";
import adminAuth from "../../middlewares/admin/admin.auth";

const route = express.Router();
// get all lacture
route.post("/login", StudentController.login);
// route.use(adminAuth);
route.get("", adminAuth, StudentController.getAll);
route.post("/register", adminAuth, StudentController.addone);
route.delete("/:id", adminAuth, StudentController.delete);
route.get("/:id", adminAuth, StudentController.getOne);
route.put("/active/:id", adminAuth, StudentController.Undelete);

export default route;
