import * as jwt from "jsonwebtoken";
import { Admin } from "../../src/entity/Admin";
import CONFIG from "../../CONFIG";
import { errRes } from "../../utility/util";

export default async (req, res, next) => {
  // get the token

  const token = req.headers.token;
  if (!token) return errRes(res, "User Not reigister!");
  try {
    //get payload
    let payload: any;
    payload = await jwt.verify(token, CONFIG.jwtUserSecret);
    console.log(payload);

    //get id
    let admin = await Admin.findOne({ where: { id: payload.id } });

    if (!admin) return errRes(res, "User Not Found admin!", 404);
    // check if the acoount active or not
    if (!admin.active)
      return errRes(res, "Please ask the admin to active the Acount");
    req.admin = admin;
    return next();
  } catch (error) {
    return errRes(res, "Invalid token");
  }
};
