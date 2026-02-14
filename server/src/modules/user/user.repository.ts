import { removeImage } from '../../utils/removeImage.js';
import User from '../user/user.model.js';
import { UserSignUp } from './user.types.js';

export async function createUser(
	username: string,
	email: string,
	hashedPassword: string,
): Promise<UserSignUp> {
	const user = new User({
		username: username.trim(),
		email: email.trim(),
		password: hashedPassword,
	});

	const createdUser = await user.save();
	return createdUser;
}

export async function checkUserExistence(email: string): Promise<UserSignUp | null> {
	const existedUser = await User.findOne({ email });
	return existedUser;
}

export async function getUserById(id: string): Promise<UserSignUp | null> {
	const user = await User.findById(id);
	return user;
}

export async function storeRefreshToken(userId: string, token: string) {
	const user = await getUserById(userId);

	if (!user) {
		throw new Error('User not found');
	}

	user.refreshToken = token;

	await user.save();
}

export async function deleteRefreshToken(id: string) {
	await User.findByIdAndUpdate(id, { refreshToken: null });
}

export async function deleteRefreshTokenByToken(refreshToken: string) {
	await User.updateOne({ refreshToken }, { $unset: { refreshToken: '' } });
}

export async function saveProfilePicture(userId: string, profilePictureUrl: string) {
	const user = await getUserById(userId);

	if (!user) {
		throw new Error('This user does not exist!');
	}

	if (user.profilePictureUrl) {
		removeImage(user.profilePictureUrl);
	}

	user.profilePictureUrl = profilePictureUrl;

	await user.save();
}

export async function saveCoverPhoto(userId: string, coverPhotoUrl: string) {
	const user = await getUserById(userId);

	if (!user) {
		throw new Error('This user does not exist!');
	}

	if (user.coverPhotoUrl) {
		removeImage(user.coverPhotoUrl);
	}

	user.coverPhotoUrl = coverPhotoUrl;

	await user.save();
}

export async function searchUsers(query: string) {
	const users = await User.find({ username: { $regex: query, $options: 'i' } })
		.select('username _id profilePictureUrl')
		.limit(5);

	return users;
}

export async function handleFollowOrUnfollow(
	userId: string,
	targetUserId: string,
	action: 1 | 2,
): Promise<boolean> {
	if (action === 1) {
		await User.findByIdAndUpdate(targetUserId, {
			$addToSet: { followers: userId },
		});

		await User.findByIdAndUpdate(userId, {
			$addToSet: { following: targetUserId },
		});

		return true;
	} else {
		await User.findByIdAndUpdate(targetUserId, {
			$pull: { followers: userId },
		});

		await User.findByIdAndUpdate(userId, {
			$pull: { following: targetUserId },
		});

		return false;
	}
}

export async function checkFollow(loggedInUserId: string, visitedUserId: string): Promise<boolean> {
	const loggedInUser = await User.findById(loggedInUserId);
	return loggedInUser?.following.includes(visitedUserId)!;
}
