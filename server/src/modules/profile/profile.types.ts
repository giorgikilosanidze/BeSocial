export interface FollowRequest {
	userId?: string;
	body: {
		targetUser?: string;
		action: 1 | 2;
	};
}
