import { request, response } from "express";
import User from "../models/user.model.js";
import { responseMessage } from "../utils/response.util.js";

export const getProfileControllers = async (request , response) => {
    const userId = request.user.user_id;
    try {
        const user = await User.findById(userId);

        responseMessage(response, "User Details", user, 200);
    } catch (error) {
        responseMessage(response, "Error getting profile details", null, 500);
    }
}

export const updateUserProfileController = async (request , response) => {
    const { user_id } = request.user;
    const userDataToUpdate = request.body;

    if (Object.keys(userDataToUpdate).length === 0) {
        responseMessage(response, "Insert at least one data to update", null, 400);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate( user_id, { $set: userDataToUpdate }, { new: true, runValidators: true } );
        
        if (!updatedUser) {
            responseMessage(response, "cannot update user profile details", null, 500);
        }

        responseMessage(response, "user profile details updates successfully", updatedUser, 200);

    } catch (error) {
        responseMessage(response, "Error updating profile details", error, 500);
    }
}