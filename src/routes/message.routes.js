import express from "express"
import { getMessageController, sendMessageController, updateMessageController, deleteMessageController } from "../controllers/message.controller.js";
import { verifyJwtToken } from '../middleware/verifyJwtToken.js';

const messageRoutes = express.Router();

messageRoutes.get('/', verifyJwtToken, getMessageController);
messageRoutes.post('/', verifyJwtToken, sendMessageController);
messageRoutes.put('/', verifyJwtToken, updateMessageController);
messageRoutes.delete('/', verifyJwtToken, deleteMessageController);

export default messageRoutes;