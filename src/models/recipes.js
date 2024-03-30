import { KmsCollection } from "../config/mongoDB.js";

function postRecipe(toIdPost) {
    return KmsCollection.insertOne(toIdPost());
}
function getAllRecipe(req) {
    return KmsCollection.find(req.query).toArray();
}
function recipeResetIsDelete() {
    return KmsCollection.updateMany({ "deleted": true }, { $set: { "deleted": false } });
}
function recipeTruncate() {
    return KmsCollection.deleteMany();
}
function recipeById(id) {
    return KmsCollection.findOne({ id: +id });
}
function recipeIsDeleteById(id) {
    return KmsCollection.updateOne({ id: +id }, { $set: { "deleted": true } });
}
function recipeDeleteById(id) {
    return KmsCollection.deleteOne({ id: +id });
}

function recipeUpdate(id, updatedRecipe) {
    return KmsCollection.updateOne({ id: +id }, { $set: updatedRecipe })
}

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