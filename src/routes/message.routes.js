import express from "express"
import { getMessageController, sendMessageController, updateMessageController } from "../controllers/message.controller.js";
import { verifyJwtToken } from '../middleware/verifyJwtToken.js';

const messageRoutes = express.Router();

messageRoutes.get('/', verifyJwtToken, getMessageController);
messageRoutes.post('/', verifyJwtToken, sendMessageController);
messageRoutes.put('/', verifyJwtToken, updateMessageController);

export default messageRoutes;