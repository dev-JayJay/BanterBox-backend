
# **Project Documentation**

## **Overview**
This project is a simple backend application built with **Node.js**, **Express**, and **MongoDB** that allows users to send messages, manage their profiles, and add friends. It includes authentication, CRUD operations for messages, and a feature to manage users' friend lists.

---

## **Technologies Used**
- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user and message data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT Authentication**: For authenticating users.

---

## **Environment Setup**

1. **Install Dependencies**
   - Run `npm install` to install required packages.

2. **Environment Variables**
   - Ensure you have a `.env` file with necessary environment variables such as:
     - **MONGO_URI**: MongoDB connection string.
     - **JWT_SECRET**: Secret key used for JWT signing.

---

## **Routes and Endpoints**

### 1. **User Registration**
   - **POST** `/auth/register`
   - **Description**: Allows a new user to register by providing a username, email, and password.
   - **Request Body**:
     ```json
     {
       "username": "john_doe",
       "email": "john@example.com",
       "password": "securepassword123"
     }
     ```
   - **Response**:
     - Success: `201 Created`
     - Failure: `400 Bad Request` (invalid data)

---

### 2. **User Login**
   - **POST** `/auth/login`
   - **Description**: Allows a user to log in and receive a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "john@example.com",
       "password": "securepassword123"
     }
     ```
   - **Response**:
     - Success: `200 OK` with a JWT token.
     - Failure: `400 Bad Request` (invalid credentials)

---

### 3. **Get User Profile**
   - **GET** `/user/profile`
   - **Description**: Retrieve the logged-in user's profile information.
   - **Authentication**: JWT token is required in the request header (`Authorization: Bearer <token>`).
   - **Response**:
     - Success: `200 OK` with the user profile data.
     - Failure: `401 Unauthorized` (if token is missing or invalid).

---

### 4. **Update User Profile**
   - **PUT** `/user/profile`
   - **Description**: Allows a user to update their profile information (e.g., name, email, etc.).
   - **Request Body**:
     ```json
     {
       "username": "john_updated",
       "email": "john_updated@example.com"
     }
     ```
   - **Response**:
     - Success: `200 OK` with updated profile data.
     - Failure: `400 Bad Request` (invalid data).

---

### 5. **Add Friend**
   - **POST** `/user/friend`
   - **Description**: Allows a user to send a friend request to another user.
   - **Request Body**:
     ```json
     {
       "friendId": "user_id_to_add"
     }
     ```
   - **Response**:
     - Success: `200 OK` (friend request sent).
     - Failure: `400 Bad Request` (invalid request).

---

### 6. **Accept Friend Request**
   - **POST** `/user/friend/accept`
   - **Description**: Allows a user to accept a friend request.
   - **Request Body**:
     ```json
     {
       "friendId": "user_id_to_accept"
     }
     ```
   - **Response**:
     - Success: `200 OK` (friend request accepted).
     - Failure: `400 Bad Request` (invalid request).

---

### 7. **Send Message**
   - **POST** `/message`
   - **Description**: Allows a user to send a message to another user.
   - **Request Body**:
     ```json
     {
       "reciverId": "friend_user_id",
       "message": "Hello, how are you?"
     }
     ```
   - **Response**:
     - Success: `201 Created` with the message data.
     - Failure: `400 Bad Request` (missing parameters).

---

### 8. **Get Messages**
   - **GET** `/message`
   - **Description**: Retrieve all messages between the logged-in user and a specified user.
   - **Request Query**:
     ```json
     {
       "reciverId": "friend_user_id"
     }
     ```
   - **Response**:
     - Success: `200 OK` with the list of messages.
     - Failure: `400 Bad Request` (missing `reciverId` query).

---

### 9. **Update Message**
   - **PUT** `/message`
   - **Description**: Allows a user to update a previously sent message.
   - **Request Query**:
     ```json
     {
       "message_id": "message_id_to_update"
     }
     ```
   - **Request Body**:
     ```json
     {
       "newMessage": "Updated message text"
     }
     ```
   - **Response**:
     - Success: `200 OK` with the updated message.
     - Failure: `400 Bad Request` (invalid `message_id` or `newMessage`).

---

### 10. **Delete Message**
   - **DELETE** `/message`
   - **Description**: Allows a user to delete a previously sent message.
   - **Request Query**:
     ```json
     {
       "message_id": "message_id_to_delete"
     }
     ```
   - **Response**:
     - Success: `200 OK` with confirmation message.
     - Failure: `400 Bad Request` (invalid `message_id`).

```
    
   # **Email Integration**:
The system is integrated with Nodemailer to send email notifications to users when certain actions occur, such as sending a message. The email sending process runs in the background to ensure that the server remains fast and responsive.

Nodemailer Email Sending Workflow
Message Sent Notification: When a user sends a message to another user, an email notification will be sent to the recipient.
SMTP Configuration: Nodemailer is configured with the SMTP server details such as host, port, user, and password.
Email Content: The email contains the message and sender details to notify the recipient about the new message.
Example of an email notification:

From: "yourapp@example.com"
To: "recipient@example.com"
Subject: "New Message from John"
Body: "You have a new message from John: 'Hello, how are you?'"
Code Example
javascript
Copy
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmailNotification = async (receiverEmail, messageContent) => {
    try {
        const mailOptions = {
            from: 'yourapp@example.com',
            to: receiverEmail,
            subject: 'New Message from Your Friend',
            text: messageContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

---

## **Models**

### 1. **User Model**
   - **Fields**:
     - `username`: String
     - `email`: String (unique)
     - `password`: String (hashed)
     - `friends`: Array of ObjectIds referencing other `User` documents (for friend list)
   - **Mongoose Schema**:
     ```javascript
     const userSchema = new mongoose.Schema({
       username: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
     });
     ```

### 2. **Message Model**
   - **Fields**:
     - `senderId`: ObjectId (reference to `User`)
     - `reciverId`: ObjectId (reference to `User`)
     - `message`: String
     - `createdAt`: Date
     - `updatedAt`: Date
   - **Mongoose Schema**:
     ```javascript
     const messageSchema = new mongoose.Schema({
       senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       reciverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       message: { type: String, required: true },
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date },
     });
     ```

---

## **Authentication and Authorization**

### **JWT Authentication**
JWT (JSON Web Tokens) is used to authenticate and authorize users. Upon successful login, the server generates a JWT and sends it back to the client. The client then includes the token in the `Authorization` header for protected routes.

#### Token Example:
```json
{
  "Authorization": "Bearer <token>"
}
```

- **Login**: On successful login, the server will return a JWT token.
- **Protected Routes**: Use `jwt.verify()` to validate the token for routes that require authentication (e.g., `/user/profile`, `/message`).

---

## **Response Format**

Each API endpoint responds with a standardized JSON response format:

```json
{
  "success": true/false,
  "message": "A descriptive message",
  "responseData": <data> // (optional)
}
```

---

## **Security Considerations**

1. **Password Hashing**: Always hash passwords before storing them in the database. This can be done using `bcrypt` or a similar hashing algorithm.
2. **JWT Security**: Use a strong `JWT_SECRET` and ensure tokens are stored securely.
3. **Access Control**: Use role-based access controls to limit which users can perform certain actions (e.g., only allow authenticated users to send messages).

---

## **Future Enhancements**

- **File Uploads**: Integrate with Firebase, AWS S3, or Cloudinary for storing images and other media files.
- **Friendship Management**: Add functionality for users to send friend requests, accept/reject them, and manage friendships.
- **Real-time Chat**: Implement WebSockets (e.g., using `socket.io`) to enable real-time messaging between users.
- **Search Messages**: Allow users to search through their messages by keyword or date.

---

## **Conclusion**

This API provides the basic functionality for user management (registration, login), messaging, and friend management. The current structure allows for the future extension of features, including real-time communication, file uploads, and further optimization.
