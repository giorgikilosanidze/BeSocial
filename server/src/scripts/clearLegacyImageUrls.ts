import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../modules/user/user.model.js';
import Post from '../modules/post/post.model.js';

dotenv.config();

const LEGACY_PATTERN = /^(?!https?:\/\/)/;

async function run() {
	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) throw new Error('MONGODB_URI is not set');

	await mongoose.connect(mongoUri);
	console.log('Connected to MongoDB');

	const userProfileResult = await User.updateMany(
		{ profilePictureUrl: { $exists: true, $ne: '', $regex: LEGACY_PATTERN } },
		{ $unset: { profilePictureUrl: '' } },
	);
	console.log(`Cleared profilePictureUrl on ${userProfileResult.modifiedCount} users`);

	const userCoverResult = await User.updateMany(
		{ coverPhotoUrl: { $exists: true, $ne: '', $regex: LEGACY_PATTERN } },
		{ $unset: { coverPhotoUrl: '' } },
	);
	console.log(`Cleared coverPhotoUrl on ${userCoverResult.modifiedCount} users`);

	const postsWithLegacyImages = await Post.find({
		imageUrls: { $elemMatch: { $regex: LEGACY_PATTERN } },
	});
	let updatedPosts = 0;
	for (const post of postsWithLegacyImages) {
		const cleaned = (post.imageUrls || []).filter((url: string) => /^https?:\/\//.test(url));
		post.imageUrls = cleaned;
		await post.save();
		updatedPosts++;
	}
	console.log(`Stripped legacy imageUrls on ${updatedPosts} posts`);

	const commentResult = await Post.updateMany(
		{ 'comments.profilePictureUrl': { $regex: LEGACY_PATTERN, $ne: '' } },
		{ $set: { 'comments.$[c].profilePictureUrl': '' } },
		{ arrayFilters: [{ 'c.profilePictureUrl': { $regex: LEGACY_PATTERN, $ne: '' } }] },
	);
	console.log(`Cleared comment.profilePictureUrl on ${commentResult.modifiedCount} posts`);

	await mongoose.disconnect();
	console.log('Done');
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
