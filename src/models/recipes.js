import { KR_Client } from "../config/mongoDB.js";

const postRecipe = (toIdPost) => KR_Client.insertOne(toIdPost());

const getAllRecipe = (req) => KR_Client.find(req.query).toArray();

const recipeResetIsDelete = () => KR_Client.updateMany({ "deleted": true }, { $set: { "deleted": false } });

const recipeTruncate = () => KR_Client.deleteMany();

const recipeById = (id) => KR_Client.findOne({ id: +id });

const recipeIsDeleteById = (id) => KR_Client.updateOne({ id: +id }, { $set: { "deleted": true } });

const recipeDeleteById = (id) => KR_Client.deleteOne({ id: +id });

const recipeUpdate = (id, updatedRecipe) => KR_Client.updateOne({ id: +id }, { $set: updatedRecipe })

export {
    postRecipe,
    getAllRecipe,
    recipeResetIsDelete,
    recipeTruncate,
    recipeById,
    recipeIsDeleteById,
    recipeDeleteById,
    recipeUpdate
}