import { request, response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { responseMessage } from "../utils/response.util.js";

export const registrationController = async (request, response) => {
  const { fullName, userName, email, password, profile_image, cover_image } =
    request.body;

  if (!fullName) {
    return responseMessage(response, "Full name is required", null, 400);
  }
  if (!userName) {
    return responseMessage(response, "User name is required", null, 400);
  }
  if (!email) {
    return responseMessage(response, "Email is required", null, 400);
  }
  if (!password) {
    return responseMessage(response, "Password is required", null, 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      profile_image,
      cover_image,
    });
    await newUser.save();
    responseMessage(response, "User registration successful", newUser, 201);
  } catch (error) {
    responseMessage(response, "User registration faild", error, 500);
    console.log(`error registering a user ${error}`);
  }
};

export const loginController = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return responseMessage(
      response,
      "email and password is requried",
      null,
      400
    );
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return responseMessage(
        response,
        "User with this email is not registered",
        null,
        400
      );
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return responseMessage(response, "Login is successfuly", user, 200);
    } else {
      return responseMessage(
        response,
        "incorrect Password please try again",
        null,
        401
      );
    }
  } catch (error) {
    responseMessage(response, "User registration faild", error, 500);
    console.log(`error logging in a user ${error}`);
  }
};
