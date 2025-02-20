import express from 'express';
import { registrationController, loginController } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/register', registrationController)

authRoute.post('/login', loginController);


export default authRoute;