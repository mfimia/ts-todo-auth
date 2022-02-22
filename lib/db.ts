import { Db, MongoClient, MongoClientOptions } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;
const dbName: string = process.env.MONGODB_DB as string;
export const mongoCollection: string = process.env.MONGODB_COLLECTION as string;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

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

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions);

  await client.connect();

  const db: Db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};
