import Post from "../models/newsFeed.model.js";
import { responseMessage } from "../utils/response.util.js";

export const createPostController = async (request, response) => {
  const { user_id } = request.user; 
  const { content, image } = request.body;

  if (!content) {
    return responseMessage(response, "Post content is required", null, 400);
  }

  try {
    const newPost = new Post({
      userId: user_id,
      content,
      image: image || null, 
    });

    await newPost.save();

    return responseMessage(response, "Post created successfully", newPost, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return responseMessage(response, "Error creating post", error, 500);
  }
};

export const getAllPostsController = async (request, response) => {
    try {
      const posts = await Post.find()
        .populate("userId", "fullName profile_image") 
        .sort({ createdAt: -1 });
  
      if (!posts || posts.length === 0) {
        return responseMessage(response, "No posts found", [], 404);
      }
  
      return responseMessage(response, "Posts fetched successfully", posts, 200);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return responseMessage(response, "Error fetching posts", error, 500);
    }
  };
  

export const likePostController = async (request, response) => {
    const { postId } = request.body; 
    const { user_id } = request.user; 
  
    if (!postId) {
      return responseMessage(response, "Post ID is required", null, 400);
    }
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return responseMessage(response, "Post not found", null, 404);
      }
  
      if (post.likes.includes(user_id)) {
        return responseMessage(response, "You have already liked this post", null, 400);
      }
  
      post.likes.push(user_id);
      await post.save();
  
      return responseMessage(response, "Post liked successfully", post, 200);
    } catch (error) {
      console.error("Error liking post:", error);
      return responseMessage(response, "Error liking post", error, 500);
    }
  };
  