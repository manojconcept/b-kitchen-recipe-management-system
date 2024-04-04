import express from 'express';
import * as authUtils from "../config/authUtils.js"
import * as userService from "../services/user.js";
import moment from 'moment';

const router = express.Router();
const timeStamp = moment().format()
const {
    createUser,
    getAllUsers,
    getUserByName,
    userTruncate,
} = userService;

const {
    genPassword,
    compairePassword,
    tokenGenerator
} = authUtils;


//To get all users
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

//Truncate;
router.delete("", async (req, res) => {
    try {
        const result = await userTruncate();
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error);
        res.status(204).send({ message: "No Content" })
    }
})

//Register
router.post("/register", async (req, res) => {
    try {
        const isCheck = await getAllUsers();
        const { username, password } = req.body;
        const userFromDB = await getUserByName({ username })
        const hashedPassword = await genPassword(password);

        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#]).{8,}$/g.test(password)) {
            res.status(400).send({ message: "password Pattern does not match" })
            return
        }

        if (isCheck.length === 0) {
            const result = await createUser(
                {
                    fname,
                    lname,
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
            res.status(409).send({ message: "Conflict" })
            return;
        }

        const result = await createUser(
            {
                fname,
                lname,
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

//Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const dataFromDB = await getUserByName({username}); // {}
        //to check username and password
        if (!dataFromDB) {
            res.status(409).send({ message: "invalid credentials" })
            return;
        }
        const isValidate = await compairePassword(password,dataFromDB.password)
        if (!isValidate) {
            res.status(409).send({ message: "invalid credentials" })
            return;
        }
        const token = tokenGenerator({id:dataFromDB._id})
        res.send({message:"Successful Login",token});
    } catch (error) {
        console.log("post Error");
        res.status(422).send({ message: "Unprocessable Entity" })
    }
})


export const userRouter = router