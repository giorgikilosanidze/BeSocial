import mongoose from 'mongoose';
import Reaction from './reaction.model.js';
import { ReactionData } from './reaction.types.js';

export async function addReaction(reactionData: ReactionData) {
	const existedReaction = await Reaction.findOne({
		postId: reactionData.postId,
		userId: reactionData.userId,
	});

	if (existedReaction) {
		existedReaction.type = reactionData.reactionType;
		await existedReaction.save();
		return;
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
