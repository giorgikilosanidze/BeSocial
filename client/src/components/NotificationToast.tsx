import type { NotificationType } from '@/types/notification';
import FollowNotification from './FollowNotification';
import ReactionNotification from './ReactionNotification';

interface NotificationToastProps {
	toasts: NotificationType[];
	onRemove: () => void;
}

const NotificationToast = ({ toasts, onRemove }: NotificationToastProps) => {
	return (
		<div className="fixed inset-x-0 bottom-6 z-[100] flex flex-col-reverse items-end gap-3 px-6 pointer-events-none overflow-hidden">
			{/* Follow Toast */}
			{toasts.map((toast, index) => {
				if (toast.type === 'follow') {
					return <FollowNotification key={index} toast={toast} onRemove={onRemove} />;
				} else {
					return <ReactionNotification key={index} toast={toast} onRemove={onRemove} />;
				}
			})}
		</div>
	);
};

export default NotificationToast;
