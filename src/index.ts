import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import notFound from "../middlewares/web/notFound";
import leactureV1 from "../routes/v1/lactures";
import adminV1 from "../routes/v1/admin";
import studentV1 from "../routes/v1/students";
import DepartmentV1 from "../routes/v1/department";
import proejctsV1 from "../routes/v1/proejcts";

const app = express();
const port = process.env.PORTLISTEN || 3000;

createConnection()
  .then(async (connection) => {
    app.use(express.json());
    app.use("/v1/students", studentV1);
    app.use("/v1/lactures", leactureV1);
    app.use("/v1/admin", adminV1);
    app.use("/v1/department", DepartmentV1);
    app.use("/v1/project", proejctsV1);
    app.use(notFound);

    app.listen(port, () =>
      console.log(`working in port : http://localhost:${port} `)
    );
    console.log("The server is Runing U can use it!!!");
  })
  .catch((error) => console.log(error));
