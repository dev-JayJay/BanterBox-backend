const message = require('../modules/MessageModule');

const SendMessage = async (req, res) => {
    const { message, senderId, receiverId } = req.body;
    try {
        if (!senderId || !receiverId || !messageText) {
            return res.status(400).json({ message: 'Sender ID, Receiver ID, and Message Text are required' });
        }

        const newMessage = message({message, senderId, receiverId});
        
        await newMessage.save();
    } catch (error) {
        res.status(400).send('Error sending message', error);
        console.log('Error sending message', error);
    }
}

const GetMessage = async (req, res) => {
    const { senderId, receiverId } = req.query;
    try {
        
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: 'Sender ID and Receiver ID are required' });
        }

        const messages = await Message.find({
            senderId,
            receiverId,
        }).sort({ timestamp: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { SendMessage, GetMessage };