import routes from '@/constants/routes';
import AuthGuard from '@/guards/AuthGuard';
import LoginSignupGuard from '@/guards/LoginSignupGuard';
import Feed from '@/pages/Feed';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';

const appRoutes = [
	{ path: routes.login, Component: Login, Guard: LoginSignupGuard },
	{ path: routes.signup, Component: Signup, Guard: LoginSignupGuard },
	{ path: routes.feed, Component: Feed, Guard: AuthGuard },
	{ path: routes.notFound, Component: NotFound },
];

export default appRoutes;
