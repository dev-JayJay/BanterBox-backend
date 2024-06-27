const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const protected = require('./routes/protected');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors()); 

//calling connection
// connectDB();

app.use('/auth',UserRoutes);
app.use(protected);

// app.get('/',(req, res)=> {
//     res.send("Home route called");
//     console.log("Home route called");
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> {
    console.log(`Sever running on http://localhost:${PORT}`);
})