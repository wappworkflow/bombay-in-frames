import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  // We don't throw at import time in dev so the rest of the app (pages that
  // don't touch the DB) can still run. The API route will throw a clear
  // error instead if this is actually missing when a DB call happens.
  console.warn(
    "[mongodb] MONGODB_URI is not set. Add it to .env.local (dev) or your Vercel Project Environment Variables (production)."
  );
}

const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable so the value is preserved across
  // Next.js hot-module-reloads, otherwise we'd open a new connection
  // on every file save.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri ?? "", options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production (Vercel), each serverless function invocation gets its
  // own module scope, so a plain module-level singleton is fine.
  client = new MongoClient(uri ?? "", options);
  clientPromise = client.connect();
}

export default clientPromise;

/** Convenience helper to grab the app's database + collection. */
export async function getLeadsCollection() {
  const c = await clientPromise;
  const dbName = process.env.MONGODB_DB || "bombay_in_frames";
  return c.db(dbName).collection("leads");
}
