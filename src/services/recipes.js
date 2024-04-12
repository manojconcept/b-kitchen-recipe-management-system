import { KMRS_Client, KR_Client } from "../config/mongoDB.js";
import { timeStamp } from "../config/utils.js";

const postRecipe = (toIdPost) => KR_Client.insertOne(toIdPost);

const getAllRecipe = (req) => KR_Client.find(req.query).toArray();

const getAllRecipeBycount = (req) => KR_Client.countDocuments(req);

const setLimitByGetAllRecipe = (offset, batchSize, queryParams) => KR_Client.find(queryParams).skip(offset).limit(batchSize).toArray();

const recipeResetIsDelete = () => KR_Client.updateMany({ "deleted": true }, { $set: { "deleted": false } });

const recipeTruncate = () => KR_Client.deleteMany();

const recipeById = (id) => KR_Client.findOne({ id: +id });

const recipeIsDeleteById = (id) => KR_Client.updateOne({ id: +id }, { $set: { "deleted": true } });

const recipeDeleteById = (id) => KR_Client.deleteOne({ id: +id });

const recipeUpdate = (id, updatedRecipe) => KR_Client.updateOne({ id: +id }, { $set: updatedRecipe })

const recipeTimeUpdate = () => KR_Client.updateMany({}, { $set: { timeStamp: timeStamp(), created:"manojconcept",saved:""} })

const getRecipeRecentlyAdd = () => KR_Client.find({ "timeStamp": { $lt: new Date() } }).toArray();

const recipeDistinct = (field) => KR_Client.distinct(field);


const getRecipeAllTypes = async () => {
    const fields = ["cuisine", "course", "diet"];
    const distinctValues = {};

    try {
        for (let field of fields) {
            distinctValues[field] = await KR_Client.distinct(field);
        }
        return distinctValues;
    } catch (error) {
        console.error('Error:', error);
    }
}


export {
    postRecipe,
    getAllRecipe,
    recipeResetIsDelete,
    recipeTruncate,
    recipeById,
    recipeIsDeleteById,
    recipeDeleteById,
    recipeUpdate,
    setLimitByGetAllRecipe,
    getAllRecipeBycount,
    getRecipeRecentlyAdd,
    recipeTimeUpdate,
    getRecipeAllTypes,
    recipeDistinct
}