import { errRes } from "../../utility/util";


export default (req, res, next) => {
  return errRes(res, `Not Found`, 404);
};