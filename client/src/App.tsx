import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import NotificationToast from './components/NotificationToast';
import { useAppDispatch } from './hooks/reduxHooks';
import { getUserOnRefresh } from './features/auth/authThunks';
import { socket } from './socket';
// import { useLocation } from 'react-router-dom';
// import routes from './constants/routes';
// import { stopLoader } from './features/auth/authSlice';

function App() {
	const [toast, setToast] = useState({});
	const dispatch = useAppDispatch();
	// const location = useLocation();

	useEffect(() => {
		// if (
		// 	location.pathname === routes.login ||
		// 	location.pathname === routes.signup ||
		// 	location.pathname === routes.notFound
		// ) {
		// 	dispatch(stopLoader());
		// }
		// if (
		// 	location.pathname !== routes.login &&
		// 	location.pathname !== routes.signup &&
		// 	location.pathname !== routes.notFound
		// ) {
		dispatch(getUserOnRefresh());
		// }
	}, [dispatch]); // locationic iko ak dependency arrayshi.

	useEffect(() => {
		socket.on('followNotification', (notification) => {
			console.log(notification);
		});

		return () => {
			socket.off('followNotification');
		};
	}, []);

	const removeToast = () => {
		setToast({});
	};

	return (
		<div>
			<AppRoutes />
			{/* TODO: control with state/socket events */}
			<NotificationToast toast={toast} onRemove={removeToast} />
		</div>
	);
}

export default App;
