import { MongoClient } from "mongodb";

const {MONGO_URL_LIVE,MONGO_URL_LOCAL} = process.env

const MONGO_CONNECT = MONGO_URL_LIVE;
// const MONGO_CONNECT = MONGO_URL_LOCAL;



const createConnection = async () => {
    const client = new MongoClient(MONGO_CONNECT);
    await client.connect();
    console.log(`Mongodb is connected`);
    return client;
}

const client = await createConnection();

//>>>>>>>>>>Creating collection<<<<<<<<<<
//-----> kmscollection
export const KmsCollection = client.db("kitchen_recipes").collection("indian");

export default createConnection;

