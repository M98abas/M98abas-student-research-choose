import { Request, Response } from "express";
import { validate } from "validate.js";
import { errRes, okRes } from "../../utility/util";
import Validate from "../../utility/validate";
import { Department } from "../../src/entity/Department";

export default class DepartmentController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const department = await Department.find({
      where: { active: true },
    });
    ///////
    const students = await Department.find({
      where: { active: true },
      join: {
        alias: "department",
        leftJoinAndSelect: {
          student: "department.students",
        },
      },
    });
    ///////
    const leacutres = await Department.find({
      where: { active: true },
      join: {
        alias: "department",
        leftJoinAndSelect: {
          leactures: "department.leactures",
        },
      },
    });
    ///////
    const projects = await Department.find({
      where: { active: true },
      join: {
        alias: "department",
        leftJoinAndSelect: {
          leactures: "department.projects",
        },
      },
    });

    return okRes(res, { department, students, leacutres, projects });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async addone(req: Request, res: Response): Promise<object> {
    let department: any;
    // tale data
    const body = req.body;

    // validateData
    let notValide = validate(body, Validate.department());
    if (notValide) return errRes(res, "Not Vaild!");

    //check if the user already exist or not
    department = await Department.findOne({ where: { name: body.name } });
    if (department)
      return errRes(res, `This ${department.name} is already taken`);
    else {
      department = await Department.create({
        name: body.name,
      });
    }
    await department.save();

    return okRes(res, { department });
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
    let department: any;

    // validateData
    let notValide = validate(body, Validate.department(false));
    if (notValide) return errRes(res, "Not Vaild!");

    department = await Department.findOne({ where: { id } });
    if (department)
      Object.keys(body).forEach((key) => {
        department[key] = body[key];
      });
    await department.save();

    return okRes(res, { department });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let department: any;
    try {
      department = await Department.findOne(id);
      if (!department) return errRes(res, "department Not found!", 404);
      department.active = !department.active;
      await department.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(department);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let department: any;
    try {
      department = await Department.findOne(id);
      if (!department) return errRes(res, "department Not found!", 404);
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, department);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async Undelete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let department: any;
    try {
      department = await Department.findOne(id);
      if (!department) return errRes(res, "department Not found!", 404);
      department.active = !department.active;
      await department.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(department);
  }
}
