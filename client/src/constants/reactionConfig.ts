import AngryNotification from '@/svg/AngryNotification';
import LikeNotification from '@/svg/LikeNotification';
import LoveNotificaiton from '@/svg/LoveNotificaiton';

const reactionConfig = {
	like: {
		bgColor: 'bg-blue-500',
		borderColor: 'border-l-blue-400',
		bgTint: 'bg-blue-50/40',
		textColor: 'text-blue-600',
		label: 'liked your post',
		icon: LikeNotification,
	},
	love: {
		bgColor: 'bg-red-500',
		borderColor: 'border-l-red-400',
		bgTint: 'bg-red-50/30',
		textColor: 'text-red-600',
		label: 'loved your post',
		icon: LoveNotificaiton,
	},
	angry: {
		bgColor: 'bg-orange-500',
		borderColor: 'border-l-orange-400',
		bgTint: 'bg-orange-50/30',
		textColor: 'text-orange-600',
		label: 'reacted angry to your post',
		icon: AngryNotification,
	},
};

export default reactionConfig;
