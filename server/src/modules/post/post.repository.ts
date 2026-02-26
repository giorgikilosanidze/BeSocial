import mongoose, { Error } from 'mongoose';
import Post from './post.model.js';
import { EditPostDB, PostType } from './post.types.js';
import { Request } from 'express';
import { PostIdParams } from '../feed/feed.types.js';
import { removeImage } from '../../utils/removeImage.js';

export async function getUserIdByPost(postId: string) {
	const post = await Post.findById(postId);
	if (!post) {
		throw new Error('Could not find post with this id!');
	}
	return post.author;
}

export async function createPost(postData: PostType) {
	const post = new Post({
		text: postData.text,
		imageUrls: postData.imageUrls,
		isEdited: false,
		author: postData.userId,
	});

	const savedPost = await post.save();

	await savedPost.populate('author', 'username _id profilePictureUrl');

	return savedPost;
}

export async function getPostsFromDB(userId?: string) {
	const posts = await Post.aggregate([
		{
			$sort: { createdAt: -1 },
		},
		{
			$lookup: {
				from: 'reactions',
				localField: '_id',
				foreignField: 'postId',
				as: 'reactions',
			},
		},
		{
			$addFields: {
				likes: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'like'] },
						},
					},
				},
				loves: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'love'] },
						},
					},
				},
				angry: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'angry'] },
						},
					},
				},
				userReaction: {
					$let: {
						vars: {
							userReactionObj: {
								$arrayElemAt: [
									{
										$filter: {
											input: '$reactions',
											as: 'reaction',
											cond: {
												$eq: [
													'$$reaction.userId',
													new mongoose.Types.ObjectId(userId),
												],
											},
										},
									},
									0,
								],
							},
						},
						in: '$$userReactionObj.type',
					},
				},
				id: '$_id',
			},
		},
		{
			$project: {
				reactions: 0,
				_id: 0,
				__v: 0,
			},
		},
	]);

	await Post.populate(posts, { path: 'author', select: 'username _id profilePictureUrl' });

	return posts;
}

export async function getPostById(postId: string, viewerId?: string) {
	const posts = await Post.aggregate([
		{
			$match: { _id: new mongoose.Types.ObjectId(postId) },
		},
		{
			$lookup: {
				from: 'reactions',
				localField: '_id',
				foreignField: 'postId',
				as: 'reactions',
			},
		},
		{
			$addFields: {
				likes: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'like'] },
						},
					},
				},
				loves: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'love'] },
						},
					},
				},
				angry: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'angry'] },
						},
					},
				},
				userReaction: {
					$let: {
						vars: {
							userReactionObj: {
								$arrayElemAt: [
									{
										$filter: {
											input: '$reactions',
											as: 'reaction',
											cond: {
												$eq: viewerId ? [
													'$$reaction.userId',
													new mongoose.Types.ObjectId(viewerId),
												] : false,
											},
										},
									},
									0,
								],
							},
						},
						in: '$$userReactionObj.type',
					},
				},
				id: '$_id',
			},
		},
		{
			$project: {
				reactions: 0,
				_id: 0,
				__v: 0,
			},
		},
	]);

	if (!posts || posts.length === 0) {
		throw new Error('Post not found');
	}

	await Post.populate(posts, { path: 'author', select: 'username _id profilePictureUrl' });

	return posts[0];
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

	await editedPost.populate('author', '_id username profilePictureUrl');

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

export async function getPostsByUserId(userId: string, viewerId?: string) {
	const posts = await Post.aggregate([
		{
			$match: { author: new mongoose.Types.ObjectId(userId) },
		},
		{
			$sort: { createdAt: -1 },
		},
		{
			$lookup: {
				from: 'reactions',
				localField: '_id',
				foreignField: 'postId',
				as: 'reactions',
			},
		},
		{
			$addFields: {
				likes: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'like'] },
						},
					},
				},
				loves: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'love'] },
						},
					},
				},
				angry: {
					$size: {
						$filter: {
							input: '$reactions',
							as: 'reaction',
							cond: { $eq: ['$$reaction.type', 'angry'] },
						},
					},
				},
				userReaction: {
					$let: {
						vars: {
							userReactionObj: {
								$arrayElemAt: [
									{
										$filter: {
											input: '$reactions',
											as: 'reaction',
											cond: {
												$eq: [
													'$$reaction.userId',
													new mongoose.Types.ObjectId(viewerId),
												],
											},
										},
									},
									0,
								],
							},
						},
						in: '$$userReactionObj.type',
					},
				},
				id: '$_id',
			},
		},
		{
			$project: {
				reactions: 0,
				_id: 0,
				__v: 0,
			},
		},
	]);

	await Post.populate(posts, { path: 'author', select: 'username _id profilePictureUrl' });

	return posts;
}
