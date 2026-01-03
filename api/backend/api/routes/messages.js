import express from "express";
import { db } from "../db.js";
import { ObjectId } from "mongodb";
import admin from "../middleware/firebaseAdmin.js"
import * as message from "./messageFunctions.js";

const router = express.Router();

router.post("/", async (req, res) => {

  
  // necessary information from request

  const userID = req.user.uid;
  const room = req.body.room;
  const now = new Date();
  const messageID = new ObjectId();

  // necessary information for batching ML api
  const userDoc = await db.collection("users").findOne({ uid: req.user.uid })
  const MESSAGE_BATCH_SIZE = 32;
  const EMBEDDED_BATCH_SIZE = userDoc.embeddedBatchLimit
  const takenLabels = userDoc?.takenLabels ?? []

  // checking validity of request

  if (!room) {
    return res.status(400).json({ error: "No Room Given!" })
  }

  let roomAccess
  if (ObjectId.isValid(room)) {
    roomAccess = await db.collection("rooms").findOne({ _id: new ObjectId(room) });
  } else {
    roomAccess = await db.collection("rooms").findOne({ _id: room });
  }

  if (!roomAccess) {
    return res.status(404).json({ error: "Room Not Found!" })
  }

  if (!roomAccess.users.some(u => u.uid === userID)) {
    return res.status(400).json({ error: "User Lacks Chat Access!" });
  }

  try {

    // these are the four horseman of the backend
    
    // uploads message to mongo historic
    message.MongoDBUploadMessage(req, messageID, now)

    // uploads message to firebase real time
    message.FirebaseUploadMessage(req, messageID, now)

    // makes embeddings
    message.embeddingBatch(req, MESSAGE_BATCH_SIZE, EMBEDDED_BATCH_SIZE, now )
    
    // makes and updates clusters
    message.maintenance(req, takenLabels, EMBEDDED_BATCH_SIZE, now)

    res.status(201).json({ id: messageID.toString() });
  } catch (err) {
    console.log(`ERROR posting: ${userID} at ${messageID}`);
    console.log(err);
    res.status(500).json({ error: "Message Send Failure!" });
  }
});

router.get("/", async (req, res) => {
  const { room, before, limit = 50 } = req.query;

  if (!room) {
    return res.status(400).json({ error: "No Room Specified!" })
  }

  let roomAccess
  if (ObjectId.isValid(room)) {
    roomAccess = await db.collection("rooms").findOne({ _id: new ObjectId(room) });
  } else {
    roomAccess = await db.collection("rooms").findOne({ _id: room });
  }

  if (!roomAccess) {
    return res.status(404).json({ error: "Room Does Not Exist!" })
  }

  if (!roomAccess.users.some(u => u.uid === (req.user.uid))) {
    return res.status(400).json({ error: "User Has No Access!" })
  }

  const maxLimit = 100;
  const safeLimit = Math.min(Number(limit), maxLimit);

  if (before && isNaN(Date.parse(before))) {
    return res.status(400).json({ error: "Invalid 'before' date" })
  }

  const query = { room }
  if (before) {
    query.time = { $lt: new Date(before) }
  }

  const messages = await db.collection("messages").find(query).sort({ time: -1 }).limit(Number(safeLimit)).toArray();
  console.log("Read!");
  res.json(messages.reverse().map(m => ({
    id: m._id.toString(),
    ...m
  })));
});

// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.collection("messages").updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  console.log("Updated!");
  res.json(result);
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.collection("messages").deleteOne({ _id: new ObjectId(id) });
  console.log("Deleted!");
  res.json(result);
});

export default router;