import express from "express";
import moment from "moment";

import { KmsCollection } from "./config/db.js";

const app = express();
const port = 7000;  
const timeLog = moment().format('MMMM Do YYYY, h:mm:ss a');

app.get("/", async (req, res) => {
    try {
        const { cuisine, diet } = req.query;
        console.log(req.query);
        const result = await KmsCollection.find(req.query).toArray();
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error);
        res.status(500).send("Internal Server Error");

    }
});

app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const getsingleRecipe = await KmsCollection.findOne({ id: id });
        res.send(getsingleRecipe || { message: "No products found" })
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.table([{
        Status: "Active",
        Port: port,
        log: timeLog,
        portal: `http://127.0.0.1:${port}/`
    }])
}
);

