import express from 'express';
import { getProfileControllers, updateUserProfileController } from '../controllers/profile.controllers.js';
import { verifyJwtToken } from '../middleware/verifyJwtToken.js';
const profileRoutes = express.Router();

profileRoutes.get('/', verifyJwtToken, getProfileControllers);
profileRoutes.put('/', verifyJwtToken, updateUserProfileController);

export default profileRoutes