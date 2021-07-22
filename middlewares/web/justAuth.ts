import { errRes } from "../../utility/util";

export default async (req, res, next) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "User Not reigister!");

  return next();
};
