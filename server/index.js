import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/user.js";
import videoRoute from "./routes/video.js";
import commentRoute from "./routes/comment.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 8000;
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("conected To MongoDB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
