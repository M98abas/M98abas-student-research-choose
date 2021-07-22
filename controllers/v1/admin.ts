import { Request, Response } from "express";
import { validate } from "validate.js";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Admin } from "../../src/entity/Admin";
import { errRes, okRes } from "../../utility/util";
import Validate from "../../utility/validate";
import CONFIG from "../../CONFIG";

export default class AdminController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const users = await Admin.find({ where: { active: true } });
    return okRes(res, { users }, 200);
  } //:TODO: remove it

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async register(req: Request, res: Response): Promise<object> {
    let admin: any;
    // take data
    const body = req.body;

    // validateData
    let notValide = validate(body, Validate.admin());
    if (notValide) return errRes(res, "Not Vaild!");

    // hash the Password
    let salt = await bcrypt.genSalt(14);
    let password = await bcrypt.hash(body.password, salt);
    body.password = password;
    //check if the user already exist or not
    admin = await Admin.findOne({ where: { email: body.email } });
    if (admin) return errRes(res, `This ${admin.email} is already taken`);
    else {
      admin = await Admin.create({
        name: body.name,
        email: body.email,
        password: body.password,
      });
    }
    await admin.save();
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
  static async login(req: Request, res: Response): Promise<object> {
    //get body
    const body = req.body;
    let email = body.email;
    //verfact user
    let notValide = validate(body, Validate.login());
    if (notValide) return errRes(res, "Not Vaild!");
    let password = body.password;
    // get user
    let admin = await Admin.findOne({ where: { email, active: true } });
    if (!admin) return errRes(res, "User Not Exist!", 404);

    // check password
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
  static async delete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let admin: any;
    try {
      admin = await Admin.findOne(id);
      if (!admin) return errRes(res, "admin Not found!", 404);
      admin.active = !admin.active;
      await admin.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(admin);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async Undelete(req: Request, res: Response): Promise<object> {
    const id = req.params.id;
    let admin: any;
    try {
      admin = await Admin.findOne(id);
      if (!admin) return errRes(res, "admin Not found!", 404);
      admin.active = !admin.active;
      await admin.save();
    } catch (error) {
      return res.json(error);
    }
    return res.json(admin);
  }
}
