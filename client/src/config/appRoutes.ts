import routes from '@/constants/routes';
import AuthGuard from '@/guards/AuthGuard';
import Feed from '@/pages/Feed';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

const appRoutes = [
	{ path: routes.login, Component: Login },
	{ path: routes.signup, Component: Signup },
	{ path: routes.feed, Component: Feed, Guard: AuthGuard },
];

export default appRoutes;
