import { errRes } from "../../utility/util";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../CONFIG";
import { Leacture } from "../../src/entity/Leacture";

export default async (req, res, next) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "User Not reigister!");

  try {
    //get payload
    let payload: any;
    payload = await jwt.verify(token, CONFIG.jwtUserSecret);
    console.log("teacher ", payload);

    //get id
    let lectur = await Leacture.findOne({
      where: { id: payload.id, email: payload.email },
    });
    if (!lectur) return errRes(res, "User Not le Found!", 404);
    // check if the acoount active or not
    if (!lectur.active)
      return errRes(res, "Please ask the admin to active the Acount");
    req.lectur = lectur;
    return next();
    //////////////////////////////////////////////
  } catch {
    return errRes(res, "Invalid token");
  }
};
