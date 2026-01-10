import { Error } from 'mongoose';
import Post from './post.model.js';
import { PostType } from './post.types.js';

export async function createPost(postData: PostType) {
	const post = new Post({
		text: postData.text,
	});

	try {
		const savedPost = await post.save();
		return savedPost;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error('Failed to create post!');
	}
}
