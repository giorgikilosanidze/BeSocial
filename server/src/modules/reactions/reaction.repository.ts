import mongoose from 'mongoose';
import Reaction from './reaction.model.js';
import { ReactionData } from './reaction.types.js';

export async function addReaction(reactionData: ReactionData): Promise<boolean> {
	const existedReaction = await Reaction.findOne({
		postId: reactionData.postId,
		userId: reactionData.userId,
	});

	if (existedReaction) {
		if (existedReaction.type === reactionData.reactionType) {
			await existedReaction.deleteOne();
			return false;
		} else {
			existedReaction.type = reactionData.reactionType;
			await existedReaction.save();
			return true;
		}
	}

	const reaction = new Reaction({
		postId: reactionData.postId,
		userId: reactionData.userId,
		type: reactionData.reactionType,
	});

	if (!reaction) {
		throw new Error('Failed to create reaction model!');
	}

	await reaction.save();

	return true;
}

export async function collectReactions(postId: string): Promise<Record<string, number>> {
	const reactions = await Reaction.aggregate([
		{ $match: { postId: new mongoose.Types.ObjectId(postId) } },
		{
			$group: {
				_id: '$type',
				count: { $sum: 1 },
			},
		},
	]);

	const formattedReactions = reactions.reduce(
		(acc, r) => {
			acc[r._id] = r.count;
			return acc;
		},
		{} as Record<string, number>,
	);

	return formattedReactions;
}

export async function collectAllReactions() {
	const reactions = await Reaction.aggregate([
		{
			$group: {
				_id: '$type',
				count: { $sum: 1 },
			},
		},
	]);

	// const formattedReactions = reactions.reduce(
	// 	(acc, r) => {
	// 		acc[r._id] = r.count;
	// 		return acc;
	// 	},
	// 	{} as Record<string, number>,
	// );

	return reactions;
}

export async function getPostReactionsDetailed(postId: string) {
	const reactions = await Reaction.find({ postId })
		.populate('userId', 'username profilePictureUrl')
		.lean()
		.exec();

	return reactions.map((r: any) => ({
		_id: r._id.toString(),
		user: {
			_id: r.userId._id.toString(),
			username: r.userId.username,
			profilePictureUrl: r.userId.profilePictureUrl,
		},
		type: r.type,
	}));
}
