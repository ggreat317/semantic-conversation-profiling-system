import express from "express";
import { db } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/UMAP/self", async (req,res) => {
  const userID = req.user.uid;
  const userDoc = await db.collection("users").findOne({_id: userID});
  const embeddedArray = userDoc[embed];
  console.log(embeddedArray);
  const result = embeddedArray
  res.json(result);
})

router.get("/UMAP/others/:userID", async (req,res) =>{
  const { userID } = req.params;

  const userDoc = await db.collection("users").findOne({uid: userID});

  if(!userDoc){
    return res.status(404).json({error: "User Not Found!"});
  }

  const embeddedArray = userDoc.embed;
  console.log("start");
  const response = await fetch("http://ml:8000/UMAP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ array: embeddedArray }),
    });
  const data = await response.json();
  console.log(data);
  console.log("done");
  res.json(response);
})

export default router;
