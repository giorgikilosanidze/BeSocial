import { Error } from 'mongoose';
import Post from './post.model.js';
import { EditPostDB, PostType } from './post.types.js';

export async function createPost(postData: PostType) {
	const post = new Post({
		text: postData.text,
		author: postData.userId,
		isEdited: false,
	});

	try {
		const savedPost = await post.save();

		await savedPost.populate('author', 'username _id');

		return savedPost;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error('Failed to create post!');
	}
}

export async function getPostsFromDB() {
	try {
		const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username _id');
		return posts;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error('Failed to fetch posts from database!');
	}
}

export async function editPostDB(editedPostData: EditPostDB) {
	try {
		const post = await Post.findById(editedPostData.postId);

		if (!post) {
			throw new Error('Post was not found!');
		}

		if (editedPostData.editedText) {
			post.text = editedPostData.editedText;
		}

		if (editedPostData.editedImageUrl) {
			post.imageUrl = editedPostData.editedImageUrl;
		}

		post.isEdited = true;

		const editedPost = await post.save();

		await editedPost.populate('author', '_id username');

		return editedPost;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error('Failed to fetch posts from database!');
	}
}
