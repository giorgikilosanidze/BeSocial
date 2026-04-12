const getNotificationDotSeenStorageKey = (userId: string) => `notification-dot-seen-at:${userId}`;

const parseTimestamp = (value: string) => {
	const timestamp = Date.parse(value);
	return Number.isNaN(timestamp) ? null : timestamp;
};

const isNewer = (first: string, second: string) => {
	const firstTimestamp = parseTimestamp(first);
	const secondTimestamp = parseTimestamp(second);

	if (firstTimestamp !== null && secondTimestamp !== null) {
		return firstTimestamp > secondTimestamp;
	}

	return first > second;
};

export const getNotificationDotSeenAt = (userId: string) => {
	if (!userId) return null;

	return localStorage.getItem(getNotificationDotSeenStorageKey(userId));
};

export const markNotificationDotSeen = (userId: string, latestNotificationCreatedAt?: string) => {
	if (!userId || !latestNotificationCreatedAt) return;

	const key = getNotificationDotSeenStorageKey(userId);
	const previousSeenAt = localStorage.getItem(key);

	if (!previousSeenAt || isNewer(latestNotificationCreatedAt, previousSeenAt)) {
		localStorage.setItem(key, latestNotificationCreatedAt);
	}
};

export const hasNewNotificationForDot = (
	userId: string,
	latestNotificationCreatedAt?: string,
) => {
	if (!userId || !latestNotificationCreatedAt) return false;

	const seenAt = getNotificationDotSeenAt(userId);

	if (!seenAt) return true;

	return isNewer(latestNotificationCreatedAt, seenAt);
};
