import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

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
app.use(express.static("public"));

// for doing crud operations in cookies of the user we use cookieParser
app.use(cookieParser());

export { app };
