import SERVER_URL from '@/constants/serverUrl';

export async function refreshTokenRequest(): Promise<void> {
	const refreshTokenResponse = await fetch(`${SERVER_URL}/api/auth/refreshToken`, {
		method: 'POST',
		credentials: 'include',
	});

	if (!refreshTokenResponse.ok) {
		const refreshTokenError = await refreshTokenResponse.json();
		throw new Error(refreshTokenError.message || 'Not authenticated');
	}
}
