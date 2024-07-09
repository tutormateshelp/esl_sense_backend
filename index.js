import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { dataRouter } from "./routes/data.js";
import { convRouter } from "./routes/conv.js";
import { charRouter } from "./routes/character.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/getConversation", convRouter);
app.use("/getLocation", charRouter);

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 2002;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
