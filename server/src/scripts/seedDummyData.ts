import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hash } from 'bcrypt';
import User from '../modules/user/user.model.js';
import Post from '../modules/post/post.model.js';
import Reaction from '../modules/reactions/reaction.model.js';
import Notification from '../modules/notification/notification.model.js';
import Chat from '../modules/chat/chat.model.js';
import cloudinary from '../config/cloudinary.js';

dotenv.config();

// Pull a remote placeholder image into Cloudinary so it is served from the CDN
// and benefits from the f_auto/q_auto/w_* transforms applied on the client
// (see client resolveImageSrc). Deterministic public_id + overwrite means
// re-running the seed replaces the same asset instead of creating orphans.
async function uploadRemoteImage(sourceUrl: string, publicId: string): Promise<string> {
	const result = await cloudinary.uploader.upload(sourceUrl, {
		folder: 'besocial',
		public_id: publicId,
		resource_type: 'image',
		overwrite: true,
	});
	return result.secure_url;
}

const usernames = [
	'emma.chen',
	'liamwalker',
	'sofia_rossi',
	'noahp',
	'avamartinez',
	'ethank',
	'miajohnson',
	'lucas.garcia',
];

const postSnippets = [
	'Finally finished my morning run. The trail by the river is the best thing about this city.',
	'Coffee shop wifi is faster than my home internet. I have so many questions.',
	'Tried making sourdough this weekend. It looked like a hockey puck but tasted alright.',
	'Anyone else just realized December is right around the corner?',
	'Spent the whole day reorganizing my bookshelf. Productivity is a state of mind.',
	'New album on repeat. Music recommendations very welcome.',
	'My plant is finally flowering after a year and a half. We did it, buddy.',
	'Just learned that octopuses have three hearts. Wild.',
	'Movie night with friends. Picked something terrible on purpose. No regrets.',
	'There is no bad weather, only bad jackets. Standing by this opinion.',
	'Saturday cleaning playlist energy.',
	'Late night thoughts: do clouds actually weigh anything?',
	'Tried a new ramen place tonight. Already planning my return visit.',
	'Sketching again after years of not. Hands are rusty but it feels good.',
];

const pickRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const randomIntInclusive = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

async function run() {
	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) throw new Error('MONGODB_URI is not set');

	const seedPassword = process.env.SEED_PASSWORD;
	if (!seedPassword) throw new Error('SEED_PASSWORD is not set in .env');

	await mongoose.connect(mongoUri);
	console.log('Connected to MongoDB');

	const hashedPassword = await hash(seedPassword, 10);

	// Remove any previously seeded dummy users (and everything that referenced
	// them) so re-running re-creates them with fresh Cloudinary-hosted images.
	// Scoped strictly to the known seed emails so real accounts are never touched.
	//
	// Re-creating seed users gives them brand-new _ids, so every document that
	// pointed at the OLD ids (or at the old seed posts) must be cleaned up here.
	// Otherwise real accounts that interacted with a seed user/post are left with
	// dangling references — e.g. follow arrays whose length no longer matches the
	// actual followers/following list.
	const seedEmails = usernames.map((username) => `${username}@example.com`);
	const existingUsers = await User.find({ email: { $in: seedEmails } });
	if (existingUsers.length) {
		const existingIds = existingUsers.map((user) => String(user._id));

		// Capture the seed users' post ids before deleting the posts, so other
		// collections that reference those posts can be cleaned up too.
		const seedPosts = await Post.find({ author: { $in: existingIds } })
			.select('_id')
			.lean();
		const seedPostIds = seedPosts.map((post) => String(post._id));

		// Delete the seed users and the posts they authored.
		await Post.deleteMany({ author: { $in: existingIds } });
		await User.deleteMany({ email: { $in: seedEmails } });

		// Follow arrays on the surviving (real) users.
		await User.updateMany(
			{},
			{
				$pull: {
					followers: { $in: existingIds },
					following: { $in: existingIds },
				},
			},
		);

		// Comments a seed user left on other (real) users' posts. (Comments on
		// the seed users' own posts are gone already — they were embedded.)
		await Post.updateMany(
			{},
			{ $pull: { comments: { userId: { $in: existingIds } } } },
		);

		// Reactions made by a seed user, or made on a now-deleted seed post.
		await Reaction.deleteMany({
			$or: [{ userId: { $in: existingIds } }, { postId: { $in: seedPostIds } }],
		});

		// Notifications involving a seed user, or about a now-deleted seed post.
		await Notification.deleteMany({
			$or: [
				{ sender: { $in: existingIds } },
				{ recipient: { $in: existingIds } },
				{ post: { $in: seedPostIds } },
			],
		});

		// Chat messages to or from a seed user.
		await Chat.deleteMany({
			$or: [{ senderId: { $in: existingIds } }, { receiverId: { $in: existingIds } }],
		});

		console.log(`Removed ${existingUsers.length} previously seeded user(s) and their posts`);
	}

	for (const username of usernames) {
		const email = `${username}@example.com`;

		const profilePictureUrl = await uploadRemoteImage(
			`https://i.pravatar.cc/300?u=${username}`,
			`seed-${username}-avatar`,
		);
		const coverPhotoUrl = await uploadRemoteImage(
			`https://picsum.photos/seed/${username}-cover/1200/400`,
			`seed-${username}-cover`,
		);

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			profilePictureUrl,
			coverPhotoUrl,
			followers: [],
			following: [],
		});

		const postsCount = randomIntInclusive(1, 3);
		for (let i = 0; i < postsCount; i++) {
			const text = pickRandom(postSnippets);
			const hasImage = Math.random() < 0.55;
			const imageUrls = hasImage
				? [
						await uploadRemoteImage(
							`https://picsum.photos/seed/${username}-${i}/900/600`,
							`seed-${username}-post-${i}`,
						),
					]
				: [];

			await Post.create({
				text,
				imageUrls,
				isEdited: false,
				author: String(newUser._id),
				comments: [],
			});
		}

		console.log(`Created ${username} with ${postsCount} post(s)`);
	}

	await mongoose.disconnect();
	console.log('Done. All seeded users share the password set in SEED_PASSWORD.');
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
