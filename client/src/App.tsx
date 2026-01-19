import { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { useAppDispatch } from './hooks/reduxHooks';
import { getUserOnRefresh } from './features/auth/authThunks';
import { useLocation } from 'react-router-dom';
import routes from './constants/routes';
import { stopLoader } from './features/auth/authSlice';

function App() {
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(() => {
		if (
			location.pathname === routes.login ||
			location.pathname === routes.signup ||
			location.pathname === routes.notFound
		) {
			dispatch(stopLoader());
		}
		if (
			location.pathname !== routes.login &&
			location.pathname !== routes.signup &&
			location.pathname !== routes.notFound
		) {
			dispatch(getUserOnRefresh());
		}
	}, [dispatch, location]);

	return (
		<div>
			<AppRoutes />
		</div>
	);
}

export default App;
