import { request, response } from "express";
import Friends from "../models/friends.model.js";
import { responseMessage } from "../utils/response.util.js";

export const getAllUserFriendsController = async (request, response) => {
  const { user_id } = request.user;
  try {
    const friends = await Friends.find({
      $or: [
        { userId1: user_id, status: "accepted" },
        { userId2: user_id, status: "accepted" },
      ],
    }).populate("userId1 userId2", "fullName profile_image");

    if (!friends || friends.length === 0) {
      return responseMessage(response, "No friends found", [], 404);
    }

    const friendList = friends.map((friendship) => {
      return friendship.userId1._id.toString() === user_id.toString()
        ? friendship.userId2
        : friendship.userId1;
    });

    return responseMessage(
      response,
      "Friends list fetched successfully",
      friendList,
      200
    );
  } catch (error) {
    console.log(`error getting this user friends ${error}`);
    responseMessage(response, "Error getting this user friends", error, 500);
  }
};

export const accepteUserFriendRequestController = async (request, response) => {
  const { friendshipId } = request.body;
  const { user_id } = request.user;

  if (!friendshipId) {
    return responseMessage(response, "Friendship ID is required", null, 400);
  }

  try {
    const friendship = await Friends.findById(friendshipId);

    if (!friendship) {
      return responseMessage(response, "Friendship not found", null, 404);
    }

    if (friendship.userId2.toString() !== user_id.toString()) {
      return responseMessage(
        response,
        "You cannot accept this request",
        null,
        400
      );
    }

    friendship.status = "accepted";
    await friendship.save();

    return responseMessage(response, "Friend request accepted", null, 200);
  } catch (error) {
    console.error(error);
    return responseMessage(
      response,
      "Error accepting friend request",
      error,
      500
    );
  }
};

export const rejectFriendRequestController = async (request, response) => {
  const { friendshipId } = request.body;
  const { user_id } = request.user;

  if (!friendshipId) {
    return responseMessage(response, "Friendship ID is required", null, 400);
  }

  try {
    const friendship = await Friends.findById(friendshipId);

    if (!friendship) {
      return responseMessage(response, "Friendship not found", null, 404);
    }

    if (friendship.userId2.toString() !== user_id.toString()) {
      return responseMessage(
        response,
        "You cannot reject this request",
        null,
        400
      );
    }

    friendship.status = "rejected";
    await friendship.save();

    return responseMessage(response, "Friend request rejected", null, 200);
  } catch (error) {
    console.error(error);
    return responseMessage(
      response,
      "Error rejecting friend request",
      error,
      500
    );
  }
};

export const sendUserFriendRequestController = async (request, response) => {
  const { userId2 } = request.body;
  const { user_id } = request.user;

  if (!userId2) {
    return responseMessage(response, "Friend's user ID is required", null, 400);
  }

  try {
    const existingFriendship = await Friends.findOne({
      $or: [
        { userId1: user_id, userId2 },
        { userId1: userId2, userId2: user_id },
      ],
    });

    if (existingFriendship) {
      return responseMessage(
        response,
        "Friendship request already exists",
        null,
        400
      );
    }

    const newFriendship = new Friends({
      userId1: user_id,
      userId2,
      status: "pending",
    });

    await newFriendship.save();

    return responseMessage(
      response,
      "Friend request sent successfully",
      null,
      200
    );
  } catch (error) {
    console.error(error);
    return responseMessage(
      response,
      "Error sending friend request",
      error,
      500
    );
  }
};
