import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `db connected !!! DB host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb connection Failed",error);
    process.exit(1); // read about it
  }
}

export { connectDB };
