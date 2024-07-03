const Message = require('../modules/MessageModule');

const SendMessage = async (req, res) => {
    const { message, senderId, receiverId } = req.body;
    try {

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: 'Sender ID, Receiver ID, and Message Text are required' });
        }

        const newMessage = Message({message, senderId, receiverId});
        await newMessage.save();
        console.log('message sent', message);

    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
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
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { SendMessage, GetMessage };