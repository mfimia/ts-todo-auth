import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;
const dbName: string = process.env.MONGODB_DB as string;

let cachedClient: any = null;
let cachedDb: any = null;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client: any = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};
