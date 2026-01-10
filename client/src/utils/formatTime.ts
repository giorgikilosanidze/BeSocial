export function timeAgo(dateString: string): string {
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	const now = new Date();
	const past = new Date(dateString);
	const diff = now.getTime() - past.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return rtf.format(-days, 'day');
	if (hours > 0) return rtf.format(-hours, 'hour');
	if (minutes > 0) return rtf.format(-minutes, 'minute');
	return rtf.format(-seconds, 'second');
}
