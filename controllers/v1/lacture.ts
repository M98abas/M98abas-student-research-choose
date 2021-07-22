import { Request, Response } from "express";
import { validate } from "validate.js";
import { Leacture } from "../../src/entity/Leacture";
import { errRes, okRes } from "../../utility/util";
import Validate from "../../utility/validate";
import * as bcrypt from "bcrypt";
import CONFIG from "../../CONFIG";
import * as jwt from "jsonwebtoken";
import { Department } from "../../src/entity/Department";
export default class LactureController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const users = await Leacture.find({ where: { active: true } });
    return res.json(users);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async addone(req: Request, res: Response): Promise<object> {
    let lacture: any;
    // tale data
    const body = req.body;

    // validateData
    let notValide = validate(body, Validate.lecture());
    if (notValide) return errRes(res, "Not Vaild!");

    let dep = body.department;
    const department = await Department.findOne({ where: { name: dep } });
    if (!department) return errRes(res, `This ${dep} is already taken`);
    // hash the Password

    let salt = await bcrypt.genSalt(14);
    let password = await bcrypt.hash(body.password, salt);
    body.password = password;
    //check if the user already exist or not
    lacture = await Leacture.findOne({ where: { id: body.id } });
    if (lacture) return errRes(res, `This ${lacture} is already taken`);
    else {
      lacture = await Leacture.create({
        name: body.name,
        email: body.email,
        password: body.password,
        sciTitle: body.sciTitle,
        department: department,
      });
    }
    await lacture.save();

    return okRes(res, { lacture });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async login(req: Request, res: Response): Promise<object> {
    //get body
    const body = req.body;
    let email = body.email;

    //verfact user
    let notValide = validate(body, Validate.login());
    if (notValide) return errRes(res, "Not Vaild!");

    // get user
    let admin = await Leacture.findOne({ where: { email, active: true } });
    if (!admin) return errRes(res, "User Not Exist!", 404);

    // check password
    let password = body.password;
    let check = await bcrypt.compare(password, admin.password);
    if (!check) return errRes(res, "Incorrect credentials");

    //get token
    let token = jwt.sign(
      { id: admin.id, email: admin.email },
      CONFIG.jwtUserSecret
    );

    return okRes(res, { token });
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
    let lacutre: any;

    // validateData
    let notValide = validate(body, Validate.lecture(false));
    if (notValide) return errRes(res, "Not Vaild!");

    if (body.password) {
      let salt = await bcrypt.genSalt(14);
      let password = await bcrypt.hash(body.password, salt);
      body.password = password;
    }

    lacutre = await Leacture.findOne({ where: { id } });
    if (lacutre)
      Object.keys(body).forEach((key) => {
        lacutre[key] = body[key];
      });
    await lacutre.save();

    return okRes(res, { lacutre });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let lacture: any;
    try {
      lacture = await Leacture.findOne(id);
      if (!lacture) return errRes(res, "Lacture Not found!", 404);
      lacture.active = !lacture.active;
      await lacture.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(lacture);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let lacture: any;
    try {
      lacture = await Leacture.findOne(id);
      if (!lacture) return errRes(res, "Lacture Not found!", 404);
    } catch (error) {
      return errRes(res, error);
    }
    return okRes(res, lacture);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async Undelete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let lacture: any;
    try {
      lacture = await Leacture.findOne(id);
      if (!lacture) return errRes(res, "Lacture Not found!", 404);
      lacture.active = !lacture.active;
      await lacture.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(lacture);
  }
}
