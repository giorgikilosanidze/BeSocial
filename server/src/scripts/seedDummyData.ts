import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hash } from 'bcrypt';
import User from '../modules/user/user.model.js';
import Post from '../modules/post/post.model.js';

dotenv.config();

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

	for (const username of usernames) {
		const email = `${username}@example.com`;

		const existing = await User.findOne({ email });
		if (existing) {
			console.log(`Skipping ${username} (already exists)`);
			continue;
		}

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			profilePictureUrl: `https://i.pravatar.cc/300?u=${username}`,
			coverPhotoUrl: `https://picsum.photos/seed/${username}-cover/1200/400`,
			followers: [],
			following: [],
		});

		const postsCount = randomIntInclusive(1, 3);
		for (let i = 0; i < postsCount; i++) {
			const text = pickRandom(postSnippets);
			const hasImage = Math.random() < 0.55;
			const imageUrls = hasImage
				? [`https://picsum.photos/seed/${username}-${i}/900/600`]
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
