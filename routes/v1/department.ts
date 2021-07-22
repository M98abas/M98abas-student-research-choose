import * as express from "express";
import DepartmentController from "../../controllers/v1/department";
import adminAuth from "../../middlewares/admin/admin.auth";

const route = express.Router();
// get all lacture
// route.use(adminAuth);
route.get("/", adminAuth, DepartmentController.getAll);
route.post("/", adminAuth, DepartmentController.addone);
route.put("/active/:id", adminAuth, DepartmentController.Undelete);
route.put("/:id", adminAuth, DepartmentController.update);
route.delete("/:id", adminAuth, DepartmentController.delete);

export default route;
