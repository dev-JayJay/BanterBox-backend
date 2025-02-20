import { request, response } from "express";
import Message from "../models/message.model.js";
import { responseMessage } from "../utils/response.util.js";

export const sendMessageController = async (request, response) => {
  const { reciverId } = request.query;
  const { message } = request.body;
  const { user_id } = request.user;

  if (!reciverId) {
    return responseMessage(response, "reciver id is requried", null, 400);
  }
  if (!message) {
    return responseMessage(response, "message to send is requried", null, 400);
  }

  try {
    const newMessage = new Message({ senderId: user_id, reciverId, message });
    await newMessage.save();
    return responseMessage(
      response,
      "message sent to this user successfully",
      newMessage,
      201
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return responseMessage(
      response,
      "Error Sending message to this user",
      error,
      500
    );
  }
};

export const getMessageController = async (request, response) => {
  const { reciverId } = request.query;
  const { user_id } = request.user;

  if (!reciverId) {
    return responseMessage(response, "reciver id is requried", null, 400);
  }
  if (reciverId == user_id) {
    return responseMessage(
      response,
      "you cannot send message to your self",
      null,
      400
    );
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user_id, reciverId },
        { senderId: reciverId, reciverId: user_id },
      ],
    });

    if (!messages || messages.length === 0) {
      return responseMessage(
        response,
        "No messages found between users",
        null,
        404
      );
    }

    return responseMessage(
      response,
      "messages found between users",
      messages,
      200
    );
  } catch (error) {
    return responseMessage(
      response,
      "Error Sending message to this user",
      error,
      500
    );
  }
};

export const updateMessageController = async (request, response) => {
  const { message_id } = request.query;
  const { newMessage } = request.body;
  if (!message_id) {
    return responseMessage(
      response,
      "Message id to update is requried",
      null,
      400
    );
  }
  if (!newMessage || newMessage.trim() === "") {
    return responseMessage(
      response,
      "New message content is required",
      null,
      400
    );
  }

  try {
    const message = await Message.findByIdAndUpdate(
      message_id,
      { $set: { message: newMessage } },
      { new: true, runValidators: true }
    );
    return responseMessage(
      response,
      "Message updated successfully",
      message,
      200
    );
  } catch (error) {
    return responseMessage(response, "Error Updating this message", error, 500);
  }
};
