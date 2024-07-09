import express from "express";
import { convModel } from "../models/Conv.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

//returns all conversation/mainly for trial purspose to check db health
router.get("/getAllConv", async (req, res) => {
  console.log("here");
  try {
    const Conversations = await convModel.find({}).sort({ _id: -1 });
    console.log(Conversations);
    return res.json({ Conversations });
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ message: "Server Error" });
  }
});

//used to get scenes by location
router.get("/location/:location", async (req, res) => {
  const location = req.params.location;

  try {
    let scenes = await convModel.find({ location: location });
    scenes = scenes.map((conv) => {
      return { title: conv.title, id: conv.convID };
    });
    const titlesArray = scenes.map((scene) => scene.title);

    return res.json({ scenes });
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ message: "Server Error" });
  }

  res.send(location);
});

//to get conversation by ID for after present-simple and progressive page
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Conversation = await convModel.findOne({ convID: id });
    console.log(Conversation);
    return res.json({ Conversation });
  } catch (error) {
    console.error();
  }

  res.send(id);
});

//to add new scene
router.post("/addConv", async (req, res) => {
  console.log("here");
  try {
    let location = req.body.location.toLowerCase();
    location = location.replace(" ", "");
    req.body.location = location;
    const newBlog = new convModel(req.body);
    await newBlog.save();
    res.send(newBlog);
  } catch (error) {
    console.log(error);
    res.send(error.name);
  }
});

 


//to delete all scene
router.delete("/DeleteAll", async (req, res) => {
  try {
    const deleteAll = await convModel.deleteMany({});

    if (deleteAll.deletedCount === 0) {
      return res.status(404).json({ msg: "No Conversations found to delete" });
    }

    res.json({ msg: "All Conversations deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//to delete any scene
router.delete("/Delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await convModel.findOneAndDelete({ convID: id });

    console.log(deletedItem);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export { router as convRouter };
