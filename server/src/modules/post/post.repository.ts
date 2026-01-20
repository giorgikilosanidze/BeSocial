import { Error } from 'mongoose';
import Post from './post.model.js';
import { EditPostDB, PostType } from './post.types.js';
import { Request } from 'express';
import { PostIdParams } from '../feed/feed.types.js';

export async function createPost(postData: PostType) {
	const post = new Post({
		text: postData.text,
		author: postData.userId,
		isEdited: false,
	});

	const savedPost = await post.save();

	await savedPost.populate('author', 'username _id');

	return savedPost;
}

export async function getPostsFromDB() {
	const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username _id');
	return posts;
}

export async function editPostDB(editedPostData: EditPostDB) {
	const post = await Post.findByIdAndUpdate(
		editedPostData.postId,
		{
			...(editedPostData.editedText && { text: editedPostData.editedText }),
			...(editedPostData.editedImageUrl && { imageUrl: editedPostData.editedImageUrl }),
			isEdited: true,
		},
		{
			new: true,
			runValidators: true,
		},
	);

	if (!post) {
		throw new Error('Post was not found!');
	}

	const editedPost = await post.save();

	await editedPost.populate('author', '_id username');

	return editedPost;
}

export async function deletePostDB(postId: string): Promise<boolean> {
	const deletedPost = await Post.findByIdAndDelete(postId);

	if (!deletedPost) {
		throw new Error('Post not found!');
	}

	return true;
}

export async function getAuthorIdByParams(req: Request<PostIdParams>) {
	const post = await Post.findById(req.params.postId);
	if (!post) throw new Error('Resource not found');
	return post.author.toString();
}

export async function getPostsCountForUsers(userId: string) {
	return await Post.countDocuments({ author: userId });
}
