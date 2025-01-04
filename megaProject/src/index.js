import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    console.log(
      `Server is running at port no: ${process.env.PORT || 5000}`
    );
  })
  .catch((err) => {
    console.log("Mongodb connection failed !!!",err);
  });
