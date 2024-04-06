import express from "express";

import * as recipeService from "../services/recipes.js";
import { auth } from "../middleware/auth.js";

const app = express();
const router = express.Router();
app.use(auth);

const {
    getAllRecipe,
    postRecipe,
    recipeResetIsDelete,
    recipeTruncate,
    recipeById,
    recipeIsDeleteById,
    recipeDeleteById,
    recipeUpdate,
    setLimitByGetAllRecipe,
    getAllRecipeBycount

} = recipeService

const message = { message: "not found" }

//----> front page
router.get("", async (req, res) => {
    try {
        console.log(req.query)
        const batchSize = 12;
        const currentPage = parseInt(req.query.limit) || 1;
        const offset = (currentPage - 1) * batchSize;
        const reqQuery = req.query;
        const { limit, ...queryParams } = reqQuery;
        const total_count = await getAllRecipeBycount(queryParams);
        const data = await setLimitByGetAllRecipe(offset, batchSize, queryParams);
        const count = {
            total_count,
            batch_count:data.length,
            page_count : currentPage
        }
        res.send({ success: true,count, data } || message);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ success: false, error: 'Internal Server Error' });
    }
});

//--------------> post
router.post("", async (req, res) => {
    try {
        const isPost = req.body;
        const preValue = await getAllRecipe(req)
        const toIdPost = () => {
            const id = preValue.length + 1
            return { ...isPost, id }
        }
        const result = await postRecipe(toIdPost)
        res.send(result);

    } catch (error) {
        console.log("Error handling request", error)
        res.status(422).send({ message: "Unprocessable Entity" })
    }
})
//-------------------> update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecipe = req.body;
        const result = await recipeUpdate(id, updatedRecipe)
        res.send(result)
    } catch (error) {
        console.log("Error handling requeset", error)
        res.status(304).send({ message: "Not Modified" })
    }
})

//-------------------------> reset update deleted false
router.put("", async (req, res) => {
    try {
        const result = await recipeResetIsDelete();
        res.send(result);
    } catch (error) {
        console.log("Error handling requeset", error)
        res.status(304).send({ message: "Not Modified" })
    }
})

//--------------------------------->truncate
router.delete("", async (req, res) => {
    try {
        const result = await recipeTruncate();
        res.send(result);
    } catch (error) {
        console.log("Error handling request", error);
        res.status(204).send({ message: "No Content" })
    }
})

//--------------------------------------> getId
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.params)
    try {
        const getsingleRecipe = await recipeById(id);
        res.send(getsingleRecipe || message)
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//---------------------------------------------> update single delete
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await recipeIsDeleteById(id);
        res.send(result);
    } catch (error) {
        console.log("Error handling request:", error);
        res.status(304).send({ message: "Not Modified" })

    }
})

//----------------------------------------------------> real single delete

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await recipeDeleteById(id)
        res.send(result);
    } catch (error) {
        console.log("Error handling request:", error);
        res.status(204).send({ message: "No Content" })
    }
})

export const recipesRoute = router