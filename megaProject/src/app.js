import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // used to accept json data
app.use(express.urlencoded({ limit: "16kb", extended: true })); // used to accept form data
app.use(express.static("public")); // used to serve static files
app.use(cookieParser()); // used to parse cookies

// import routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export default app;
