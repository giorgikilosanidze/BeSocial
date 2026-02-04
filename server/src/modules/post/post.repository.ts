import { Error } from 'mongoose';
import Post from './post.model.js';
import { EditPostDB, PostType } from './post.types.js';
import { Request } from 'express';
import { PostIdParams } from '../feed/feed.types.js';
import { removeImage } from '../../utils/removeImage.js';

export async function createPost(postData: PostType) {
	const post = new Post({
		text: postData.text,
		imageUrls: postData.imageUrls,
		isEdited: false,
		author: postData.userId,
	});

	const savedPost = await post.save();

	await savedPost.populate('author', 'username _id');

	return savedPost;
}

export async function getPostsFromDB() {
	const posts = await Post.find()
		.sort({ createdAt: -1 })
		.populate('author', 'username _id profilePictureUrl');
	return posts;
}

export async function editPostDB(editedPostData: EditPostDB) {
	const post = await Post.findByIdAndUpdate(
		editedPostData.postId,
		{
			...(editedPostData.editedText && { text: editedPostData.editedText }),
			...(editedPostData.editedImageUrls && { imageUrls: editedPostData.editedImageUrls }),
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

export async function deletePostDB(postId: string) {
	const postToDelete = await Post.findById(postId);

	if (!postToDelete) {
		throw new Error('Post not found!');
	}

	if (postToDelete.imageUrls) {
		postToDelete.imageUrls.forEach((url) => {
			removeImage(url);
		});
	}

	await postToDelete.deleteOne();
}

export async function getAuthorIdByParams(req: Request<PostIdParams>) {
	const post = await Post.findById(req.params.postId);
	if (!post) throw new Error('Resource not found');
	return post.author.toString();
}

export async function getPostsCountForUsers(userId: string) {
	return await Post.countDocuments({ author: userId });
}

export async function getPostsByUserId(userId: string) {
	return await Post.find({ author: userId })
		.sort({ createdAt: -1 })
		.populate('author', 'username _id profilePictureUrl');
}
