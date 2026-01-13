import { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { useAppDispatch } from './hooks/reduxHooks';
import { getUserOnRefresh } from './features/auth/authThunks';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserOnRefresh());
	}, [dispatch]);

	return (
		<div>
			<AppRoutes />
		</div>
	);
}

export default App;
