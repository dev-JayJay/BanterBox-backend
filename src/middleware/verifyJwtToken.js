import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import { responseMessage } from '../utils/response.util';

dotenv.config();

export const verifyJwtToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return responseMessage(res, "No token provided", null, 403);
  }
  try {
    const mySecretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, mySecretKey);

    req.user = decoded;

    next();

  } catch (error) {
     return responseMessage(res, 'Invalid or expired token', error, 403);
  }
};
