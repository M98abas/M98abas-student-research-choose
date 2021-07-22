import { errRes } from "../../utility/util";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../CONFIG";
import { Student } from "../../src/entity/Student";

export default async (req, res, next) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "User Not reigister!");

  try {
    //get payload
    let payload: any;
    payload = await jwt.verify(token, CONFIG.jwtUserSecret);
    console.log("std ", payload);

    //get id
    let student = await Student.findOne({ where: { id: payload.id } });
    if (!student) return errRes(res, "User Not std Found!", 404);
    // check if the acoount active or not
    if (!student.active)
      return errRes(res, "Please ask the admin to active the Acount");
    req.student = student;
    return next();

    //////////////////////////////////////////////
  } catch {
    return errRes(res, "Invalid token");
  }
};
