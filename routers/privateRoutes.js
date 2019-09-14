import HomeScreen from '../screens/HomeScreen';
// import EditProfile from '~/components/UserProfile/EditProfile';
// import QuestionsBoard from '~/components/Questions/QuestionsBoard';
// import FriendsBoard from '~/components/Friends/FriendsBoard';
// import UserProfile from '~/components/UserProfile/UserProfile';

const privateRoutes = [
  // {
  //   path: '/profile/:username',
  //   authenticatedRender: true,
  //   name: 'Profile',
  //   component: UserProfile
  // },
  // {
  //   path: '/questions/:questionId',
  //   authenticatedRender: true,
  //   name: 'Profile',
  //   component: UserProfile
  // },
  // { path: '/me', exact: true, name: 'Profile', component: UserProfile },
  // { path: '/questions', exact: true, name: 'Questions', component: QuestionsBoard },
  // { path: '/friends', exact: true, name: 'Friends', component: FriendsBoard },
  // { path: '/me/edit', exact: true, name: 'Edit Profile', component: EditProfile },
  { path: '/dashboard', exact: true, name: 'HomeScreen', component: HomeScreen }
];

export default privateRoutes;
