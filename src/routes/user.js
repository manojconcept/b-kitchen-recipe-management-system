import express from 'express';
import * as auth from "../config/auth.js"
import * as userModel from "../models/user.js";
import moment from 'moment';


const router = express.Router();
const timeStamp = moment().format()
const {
    createUser,
    getAllUsers,
    getUserByName,
    userTruncate,
} = userModel;

const {
    genPassword,
    compairePassword,
} = auth

router.get("", async (req, res) => {
    try {
        const result = await getAllUsers(req);
        if (result.length === 0) {
            res.status(404).send({ message: "Not found" });
            return;
        }
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})


router.delete("", async (req, res) => {
    try {
        const result = await userTruncate();
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error);
        res.status(204).send({ message: "No Content" })
    }
})

router.post("", async (req, res) => {
    try {
        const isCheck = await getAllUsers();
        const { username, password } = req.body;
        const userFromDB = await getUserByName({ username })
        const hashedPassword = await genPassword(password);

        if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#]).{8,}$/g.test(password)){
            res.status(400).send({message:"password Pattern does not match"})
            return
        }

        if (isCheck.length === 0) {
            const result = await createUser(
                {
                    username,
                    password: hashedPassword,
                    id: 1,
                    created: timeStamp,
                    ban: false
                }
            )
            res.send(result);
            return;
        }

        if (userFromDB) {
            res.status(409).send({message:"Conflict"})
            return;
        }

        const result = await createUser(
            {
                username,
                password: hashedPassword,
                id: userFromDB.length + 1,
                created: timeStamp,
                ban: false
            }
        )
        res.send(result);
    } catch (error) {
        console.log("post Error");
        res.status(422).send({ message: "Unprocessable Entity" })
    }
})


router.post("/createdb", (req, res) => {

})


export const userRouter = router