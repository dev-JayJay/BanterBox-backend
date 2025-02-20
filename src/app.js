import express from 'express';
import indexRoutes from './routes/index.routes.js';
import { connectMongoDB } from './config/mongo.config.js';
import dotenv from 'dotenv'; 

dotenv.config();


const app = express();
app.use(express.json());

connectMongoDB();


app.use('/v1/api/', indexRoutes);

app.get('/', (req, res) => {
    res.send('Hello jay route is configured');
})

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`app is running at http://localhost:${PORT}`);
})


