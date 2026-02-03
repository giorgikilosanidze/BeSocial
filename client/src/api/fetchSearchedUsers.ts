import SERVER_URL from '@/constants/serverUrl';

export default async function fetchSearchedUsers(query: string): Promise<[]> {
	const response = await fetch(`${SERVER_URL}/api/search?search=${encodeURIComponent(query)}`, {
		credentials: 'include',
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error('Search failed!');
	}

	return data;
}
