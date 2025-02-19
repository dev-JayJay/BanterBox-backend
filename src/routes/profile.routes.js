import express from 'express';
import { getProfileControllers } from '../controllers/profile.controllers.js';
import { verifyJwtToken } from '../middleware/verifyJwtToken.js';
const profileRoutes = express.Router();

profileRoutes.get('/', verifyJwtToken, getProfileControllers)

export default profileRoutes