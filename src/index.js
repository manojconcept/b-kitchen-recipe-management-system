import express from "express";
import moment from "moment";
import { recipesRoute } from "./routes/recipes.js";


const app = express();
const port = 7000;
const timeLog = moment().format('MMMM Do YYYY, h:mm:ss a');
app.use(express.json());


app.use("/api/v1/recipes",recipesRoute)

app.listen(port, () => {
    console.table([{
        Status: "Active",
        Port: port,
        log: timeLog,
        portal: `http://127.0.0.1:${port}/`
    }])
}
);


