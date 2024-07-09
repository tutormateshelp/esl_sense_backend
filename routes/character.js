import express from "express";
 
const router = express.Router();

//to get location for any particular character
router.get("/:character", async (req, res) => {
  try {
    let location = "";
    let character = req.params.character;

    if (character === "Bank Teller") {
      location = "bank";
    } else if (character === "Doctor") {
      location = "hospital";
    } else if (character === "Landlord") {
      location = "apartment";
    } else if (character === "Postman") {
      location = "post office";
    } else if (character === "Firefighter") {
      location = "fire station";
    } else if (character === "Manager") {
      location = "workplace";
    } else {
      throw new Error("Invalid character");
    }

    res.status(200).json({ location });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as charRouter };
