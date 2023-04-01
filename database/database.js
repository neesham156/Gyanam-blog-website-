import mongoose from "mongoose";




const MONGODB_URI = process.env.DATABASE_CONNECTION;



// console.log("dsfsf" + MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;


if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // console.log("here");

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
      keepAlive: true,
    };
    console.log(cached.promise)
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
   
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function dbMiddleware(req, res, next) {
  // console.log(req.headers);

  await dbConnect();
  // console.log(await dbConnect());
  return next();
}

export function Jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export function Capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default dbConnect;
