import { KRMS_USER_Client } from "../config/mongoDB.js";

const createUserRecipesListAddon = (userObjId, param) => KRMS_USER_Client(userObjId).insertOne(param);

const getUserRecipesListAddon = (userObjId, req) => KRMS_USER_Client(userObjId).find(req).toArray();

const updateUserRecipesListAddon = (userObjId,id,updatedRecipeListAddon)=>KRMS_USER_Client(userObjId).updateOne({ id: +id }, { $set: updatedRecipeListAddon })

const countUserRecipesListAddon = (userObjId) => KRMS_USER_Client(userObjId).countDocuments()

const DeleteUserRecipesListAddonById = (userObjId,id) => KRMS_USER_Client(userObjId).deleteOne({ id: +id });


export {
    createUserRecipesListAddon,
    getUserRecipesListAddon,
    updateUserRecipesListAddon,
    countUserRecipesListAddon,
    DeleteUserRecipesListAddonById
};