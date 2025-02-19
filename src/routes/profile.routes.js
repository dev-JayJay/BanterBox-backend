import express from 'express';
const profileRoutes = express.Router();

profileRoutes.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`checking the profile of user ${id}`);
})

export default profileRoutes