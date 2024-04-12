import express from "express";
import moment from "moment";
import methodOverride from 'method-override'
import cors from "cors"

import { recipesRoute } from "./routes/recipes.js";
import { userRouter } from "./routes/user.js";

const app = express();
const port = 7000;
const timeLog = moment().format('MMMM Do YYYY, h:mm:ss a');
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/recipes", recipesRoute);

app.listen(port, () => {
  console.table([{
    Status: "Active",
    Port: port,
    log: timeLog,
    portal: `http://127.0.0.1:${port}/`,
  }])
}
);

