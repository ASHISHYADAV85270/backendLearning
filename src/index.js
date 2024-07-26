import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "./db/index.js";
import { app } from "./app.js";



// it will return a promise
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`App runnig at port ${process.env.PORT}`);
    });
    app.on("error", () => {
      console.log("Error from app", error);
    });
  })
  .catch((err) => {
    console.log("MongoDb Connection Failed !!!!!", err);
  });
