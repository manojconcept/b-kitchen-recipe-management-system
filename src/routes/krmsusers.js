import express from "express";
import { auth } from "../middleware/auth.js";
import * as userService from "../services/user.js"
import * as krmsuserService from "../services/krmsusers.js"

const router = express.Router();

const {
    getUserByName
} = userService

const {
    getUserRecipesListAddon,
    updateUserRecipesListAddon,
    DeleteUserRecipesListAddonById
} = krmsuserService

router.use(auth)

router.post("", async (req, res) => {
    try {
        const { username } = req.body;
        const userData = await getUserByName({ username });
        const result = await getUserRecipesListAddon(JSON.stringify(userData._id))
        res.send(result);
    } catch (error) {
        res.status(422).send({ message: "Unprocessable Entity" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUserData = req.body;
        const getUserData = await getUserByName({ username:updatedUserData.created });
        const result = await updateUserRecipesListAddon(JSON.stringify(getUserData._id),id,updatedUserData)
       res.send(result);
    } catch (error) {
        console.log("Error handling requeset", error)
        res.status(304).send({ message: "Not Modified" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUserData = req.body;
        const getUserData = await getUserByName( deleteUserData );
        const result = await DeleteUserRecipesListAddonById(JSON.stringify(getUserData._id),id)
        res.send(result);
    } catch (error) {
        console.log("Error handling request:", error);
        res.status(204).send({ message: "No Content" })
    }
})

export const krmsUserRouter = router