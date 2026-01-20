import routes from '@/constants/routes';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginSignupGuardProps {
	children: ReactNode;
}

const LoginSignupGuard = ({ children }: LoginSignupGuardProps) => {
	const isLoggedin = useAppSelector((state) => state.auth.isLoggedIn);
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedin) {
			navigate(routes.feed, { replace: true });
		}
	}, [isLoggedin, navigate]);

	if (isLoggedin || isLoading) {
		return null;
	}

	return <>{children}</>;
};

export default LoginSignupGuard;
