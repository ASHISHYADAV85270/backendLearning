import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
// Middle Wares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//allowing json to accept as a data input
app.use(express.json({ limit: "16kb" }));

// for encoding urls such as --> ashishyadav is converted to ashish+yadav%20
//extends is used passing nested object in the url
app.use(express.urlencoded({ extends: true, limit: "16kb" }));

// for storing images pdf in your server for a short duration
// mtlb public folder ko static ki tarah use krna
app.use(express.static("public"));

// for doing crud operations in cookies of the user we use cookieParser
app.use(cookieParser());

/* routes */
import userRouter from "../src/routes/user.routes.js";

/* routes declaration */
app.use("/api/v1/users", userRouter);
// localhost:8000/api/v1/users/register
export { app };
