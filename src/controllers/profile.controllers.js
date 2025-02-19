import { request, response } from "express";
import User from "../models/user.model.js";
import { responseMessage } from "../utils/response.util.js";

export const getProfileControllers = async (request , response) => {
    const userId = request.user.user_id;
    console.log(`this is the user id from the verifyToken function ${userId}`)
    try {
        const user = await User.findById(userId);

        responseMessage(response, "User Details", user, 200);
    } catch (error) {
        responseMessage(response, "Error getting profile details", null, 500);
    }
}