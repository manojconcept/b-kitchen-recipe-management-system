import express from "express";
import moment from "moment";

import { KmsCollection } from "./config/db.js";
import e from "express";

const app = express();
const port = 7000;
const timeLog = moment().format('MMMM Do YYYY, h:mm:ss a');
app.use(express.json({limit: '50mb'}));

const message = { message: "not found" }


// -data retrive
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

//--------------> post
app.post("", async (req, res) => {
    const isPost = req.body;
    const postAll = isPost.map((ele, index) => {
        delete ele._id;
        const id = index+1 ;
        return { ...ele, id: id };
    })
    try {
        const result = await KmsCollection.insertMany(postAll)
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error)
        res.status(422).send({message:"Unprocessable Entity"})
    }
})

//---------------->truncate
app.delete("", async (req, res) => {
    try {
        const result = await KmsCollection.deleteMany();
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error);
        res.status(404).send("Internal server Error")
    }
})


//---> since there is no id 
app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const getsingleRecipe = await KmsCollection.findOne({ id: id });
        res.send(getsingleRecipe || message)
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

