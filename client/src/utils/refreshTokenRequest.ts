export async function refreshTokenRequest(): Promise<void> {
	const refreshTokenResponse = await fetch('http://localhost:3000/api/auth/refreshToken', {
		method: 'POST',
		credentials: 'include',
	});

	if (!refreshTokenResponse.ok) {
		const refreshTokenError = await refreshTokenResponse.json();
		throw new Error(refreshTokenError.message || 'Not authenticated');
	}
}
