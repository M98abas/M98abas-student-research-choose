import { Request, Response } from "express";
import { validate } from "validate.js";
import { errRes, okRes } from "../../utility/util";
import Validate from "../../utility/validate";
import { Project } from "../../src/entity/Project";
import { Student } from "../../src/entity/Student";

export default class projectController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const project = await Project.find({
      where: { active: true },
      join: {
        alias: "projects",
        leftJoinAndSelect: {
          student: "projects.students",
        },
      },
    });
    console.log(project);

    // const project = await Project.find({ where: { active: true } });
    const student = await Student.find({ where: { active: true } });
    console.log(student);

    return okRes(res, { project, student });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async addone(req: Request, res: Response): Promise<object> {
    let project: any;
    // tale data
    const body = req.body;

    // validateData
    let notValide = validate(body, Validate.proejcts());
    if (notValide) return errRes(res, "Not Vaild!");

    //check if the user already exist or not
    project = await Project.findOne({
      where: { title: body.title },
    });
    if (project) return errRes(res, `This ${project.title} is already taken`);
    else {
      project = await Project.create({
        title: body.title,
      });
    }
    await project.save();

    return okRes(res, { project });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async addNewStdToProject(req, res): Promise<object> {
    // get data
    const proId = req.params.id;
    let student = req.student;

    // search for the std and save it in the project
    // let student = await Student.findOne({ where: { id: stdId } });
    if (!student.project) return errRes(res, "you have already in projects");
    // console.log("data", student);

    let project = await Project.findOne({ where: { id: proId, active: true } });
    if (!project) return errRes(res, "Error");
    // check if project has more than 3 std
    let studnetcount = await Student.count({ where: { project: proId } });
    if (studnetcount <= 3) project.active = false;
    // add the std to project

    student.project = project;
    await student.save();

    return okRes(res, { project, student });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async removeStdFromProject(req, res): Promise<object> {
    // get data
    const proId = req.params.id;
    let student = req.student;

    // search for the std and save it in the project
    // let student = await Student.findOne({ where: { id: stdId } });
    if (!student.project) return errRes(res, "you have already in projects");
    // console.log("data", student);

    let project = await Project.findOne({ where: { id: proId } });
    if (!project) return errRes(res, "Error");
    student.project = null;
    project.active = true;
    await student.save();
    // check if project has more than 3 std

    // add the std to project

    return okRes(res, { project, student });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async update(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    const body = req.body;
    let project: any;

    // validateData
    let notValide = validate(body, Validate.proejcts(false));
    if (notValide) return errRes(res, "Not Vaild!");

    project = await Project.findOne({ where: { id } });
    if (project)
      Object.keys(body).forEach((key) => {
        project[key] = body[key];
      });
    await project.save();

    return okRes(res, { project });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let project: any;
    try {
      project = await Project.findOne(id);
      if (!project) return errRes(res, "project Not found!", 404);
      project.active = !project.active;
      await project.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(project);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let project: any;
    try {
      project = await Project.find({
        where: { id, active: true },
        join: {
          alias: "projects",
          leftJoinAndSelect: {
            student: "projects.students",
          },
        },
      });
      if (!project) return errRes(res, "project Not found!", 404);
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, project);
  }
}
