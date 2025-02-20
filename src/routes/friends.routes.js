import express from "express";
import { verifyJwtToken } from "../middleware/verifyJwtToken";
import {
  accepteUserFriendRequestController,
  getAllUserFriendsController,
  rejectFriendRequestController,
  sendUserFriendRequestController,
} from "../controllers/friends.controller";
const friendsRotues = express.Router();

friendsRotues.get("/", verifyJwtToken, getAllUserFriendsController);
friendsRotues.post("/", verifyJwtToken, accepteUserFriendRequestController);
friendsRotues.post("/", verifyJwtToken, rejectFriendRequestController);
friendsRotues.post("/", verifyJwtToken, sendUserFriendRequestController);

export default friendsRotues;
