import Login from '~/components/Login/Login';
import CreateDisplayName from '~/components/NewAccountScreen/CreateDisplayName';
import SelectGender from '~/components/NewAccountScreen/SelectGender';
import CreateAccount from '~/components/NewAccountScreen/CreateAccount';
import Welcome from '~/components/NewAccountScreen/Welcome';
import Logout from '~/components/Login/Logout';
import NotFoundPage from '~/components/NotFoundPage';
import LoginByUsername from '~/components/Login/LoginByUsername';
import UserProfile from '~/components/UserProfile/UserProfile';
import FbLoginCallback from '~/components/Login/FbLoginCallBack';
import GlobalPagePrivacy from '~/components/Common/GlobalPagePrivacy';

const publicRoutess = [
  { path: '/profile/:username', withProfileLayout: true, name: 'Profile', component: UserProfile },
  {
    path: '/questions/:questionId',
    withProfileLayout: true,
    name: 'Questions',
    component: UserProfile
  },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/auth', exact: true, name: 'Login', component: LoginByUsername },
  { path: '/account', exact: true, name: 'Create your account', component: CreateDisplayName },
  { path: '/account/gender', exact: true, name: 'Create your account', component: SelectGender },
  { path: '/account/username', exact: true, name: 'Create your account', component: CreateAccount },
  { path: '/account/welcome', exact: true, name: 'Create your account', component: Welcome },
  { path: '/logout', exact: true, name: 'Logout', component: Logout },
  { path: '/404', exact: true, name: '404 Not found', component: NotFoundPage },
  {
    path: '/auth/callback/facebook',
    exact: true,
    name: 'Login facebook callback',
    component: FbLoginCallback
  },
  { path: '/privacy', exact: true, name: 'Privacy', component: GlobalPagePrivacy },
  { path: '/term-of-use', exact: true, name: 'Term of use', component: GlobalPagePrivacy }
];
const publicRoutes = [];
export default publicRoutes;
