import { KMRS_Client } from "../config/mongoDB.js";

const createUser = (param) => KMRS_Client.insertOne(param);

const getAllUsers = () => KMRS_Client.find({}, { _id: 0, password: 0 }).toArray();

const getUserByName = (param) => KMRS_Client.findOne(param);

const userTruncate = () => KMRS_Client.deleteMany();

export {
    createUser,
    getAllUsers,
    getUserByName,
    userTruncate
}