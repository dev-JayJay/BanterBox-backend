import express from "express";
import { verifyJwtToken } from "../middleware/verifyJwtToken";
import { createPostController, getAllPostsController, likePostController } from "../controllers/newFeed.controller";
const newsFeedRouter = express.Router();


newsFeedRouter.post('/', verifyJwtToken, createPostController);
newsFeedRouter.get('/', verifyJwtToken, getAllPostsController);
newsFeedRouter.post('/', verifyJwtToken, likePostController);

export default newsFeedRouter;