import * as express from "express";
import projectController from "../../controllers/v1/projects";
import stdAuth from "../../middlewares/web/auth.std";
import leactureAuth from "../../middlewares/web/auth.lecture";
import justAuth from "../../middlewares/web/justAuth";
const route = express.Router();
// get all lacture
route.get("/", justAuth, projectController.getAll);
route.get("/:id", justAuth, projectController.getOne);
route.post("/", leactureAuth, projectController.addone);
route.post("/addstd/:id", stdAuth, projectController.addNewStdToProject);
route.put("/addstd/:id", stdAuth, projectController.removeStdFromProject);

export default route;
