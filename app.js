const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const mongoose = require('./config/db')

const app = express();

app.use(express.json());
//calling connection
// mongoose();

app.use('/auth',UserRoutes);

app.get('/',(req, res)=> {
    res.send("register route called")
    console.log("register route called");
});

const PORT = process.env.PORT || 3004;
app.listen(PORT,()=> {
    console.log(`Sever running on http://localhost:${PORT}`);
})