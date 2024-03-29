import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongo_url_local = 'mongodb://127.0.0.1:27017';
const mongo_url = process.env.MONGO_URL 

const createConnection = async () => {
    const client = new MongoClient(mongo_url);
    await client.connect();
    console.log(`Mongodb is connected`);
    return client;
}

const client = await createConnection();

//>>>>>>>>>>Creating collection<<<<<<<<<<
//-----> kmscollection
export const KmsCollection = client.db("kitchen_recipes").collection("indian");

export default createConnection;

