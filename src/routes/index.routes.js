// index.routes.js
import express from 'express';
import authRoute from './auth.routes.js';
import profileRoute from './profile.routes.js';

const indexRoutes = express.Router();

indexRoutes.use('/auth', authRoute);
indexRoutes.use('/profile', profileRoute);

export default indexRoutes; 
