const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.use(express.json());
//calling connection
connectDB();

app.use('/auth',UserRoutes);

app.get('/',(req, res)=> {
    res.send("Home route called");
    console.log("Home route called");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> {
    console.log(`Sever running on http://localhost:${PORT}`);
})