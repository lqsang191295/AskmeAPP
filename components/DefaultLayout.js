import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-native';
import { connect } from 'react-redux';
import privateRoutes from '~/routers/privateRoutes';
import AppHeader from '~/components/Layout/AppHeader';
import AppFooter from '~/components/Layout/AppFooter';
import PersistentMask from '~/components/Common/PersistentMask';
import AnswerBoardInput from '~/components/Questions/AnswerBoardInput';
import MessageItemMenu from '~/components/Messages/MessageItemMenu';
import GlobalResultAlert from '~/components/Common/GlobalResultAlert';
import CustomShare from '~/components/Share/CustomShare';
import EUGDPR from '~/components/Common/EUGDPR';
import { customShareActions } from '~/actions/customShare.actions';
import UserProfile from '~/components/UserProfile/UserProfile';
import Dashboard from '~/components/Dashboard';
import AskingBoardInput from '~/components/Asking/AskingBoardInput';
import SupportedLanguages from '~/components/Language/SupportedLanguages';
import GlobalResultAlertMask from '~/components/Common/GlobalResultAlertMask';
import GlobalLoading from '~/components/Common/GlobalLoading';
import { initLoggedInUser, getUserInfo } from '~/actions/User/user.actions';
import { isUserLoggedIn } from '~/routers/AppRouter';
import { getExtraData, isSubdomain, getSubdomain } from '~/utils/Common';
import profileActions from '~/actions/Profile/profile.actions';
import ShareFlowController from '~/helpers/Flow/ShareFlowController';
import UrlUtils from '~/utils/Url';
import { answerActions } from '~/actions/answer.actions';
import Tracker from '~/utils/Tracker';
import { getActiveNavigationStack } from '~/selectors/app.selectors';
import history from '~/routers/history';

const TermsContainer = React.lazy(() => import('~/components/Common/TermsContainer'));

const getHomeScreenRoute = (isProfilePage, userId) =>
  isProfilePage ? (
    <Route
      key="profile"
      path="/"
      exact
      name="Home"
      render={props => <UserProfile {...props} profileUserId={userId} name="Home" />}
    />
  ) : (
    <Route
      key="Home"
      path="/"
      exact
      name="Home"
      render={props => <Dashboard {...props} name="Home" />}
    />
  );

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.extraData = getExtraData();
  }

  componentDidMount() {
    this.props.initLoggedInUser().then(this.handleComponentDidMount);
  }

  handleComponentDidMount = () => {
    if (ShareFlowController.isRunning()) {
      setTimeout(() => {
        if (typeof this.props.showCustomShare !== 'undefined') {
          this.props.showCustomShare();
        }
      }, 800);
    }

    if (this.isProfileNotFound()) {
      this.props.notFound();
      return;
    }

    if (!this.isProfilePage() && isSubdomain()) {
      this.checkUserInfo();
    }

    this.checkRepliedQuestion();
    this.checkSharedProfile();
  };

  checkRepliedQuestion = () => {
    const { search } = window.location;
    const questionId = UrlUtils.getQueryVariable('replied_question', search);
    const errorCode = UrlUtils.getQueryVariable('error_code', search);
    if (questionId) {
      if (errorCode === '4201') {
        Tracker.userBehavior('Share', 'Share Question Failed - User cancel', 1);
      } else {
        this.props.alertSuccess();
        history.push('/questions');
      }
    }
  };

  checkSharedProfile = () => {
    const { search } = window.location;
    const shareId = UrlUtils.getQueryVariable('shared_profile', search);
    const errorCode = UrlUtils.getQueryVariable('error_code', search);
    if (shareId) {
      if (errorCode === '4201') {
        Tracker.userBehavior('Share', 'Share Profile Failed - User cancel', 1);
      }
    }
  };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  isProfilePage = () => !!this.extraData.profileInfo;

  isProfileNotFound = () => {
    const { profileInfo } = this.extraData;
    return profileInfo && profileInfo.notFound;
  };

  checkUserInfo = async () => {
    const userId = getSubdomain();
    const data = await getUserInfo(userId);
    if (!data || !data.data) {
      this.props.notFound();
    }
  };

  getUserId = () => {
    const { profileInfo } = this.extraData;
    return profileInfo ? profileInfo.userId : null;
  };

  render() {
    const { navigation } = this.props;
    const HomeScreen = getHomeScreenRoute(this.isProfilePage(), this.getUserId());
    return (
      <>
        <GlobalResultAlertMask />
        <PersistentMask />
        {navigation !== 'HOME' ? <AppHeader /> : null}
        <div
          className={`app-body ${navigation === 'PROFILE' ? 'app-body-padding-bottom' : ''} ${
            navigation === 'HOME' ? 'no-padding' : ''
          }`}
        >
          <Suspense fallback={this.loading()}>
            <Switch>
              {privateRoutes.map(route =>
                route.component ? (
                  <Route
                    key={`${route.name}`}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props} name={route.name} />}
                  />
                ) : null
              )}

              {isUserLoggedIn() && HomeScreen}
              <Redirect from="/" to="/404" />
            </Switch>
          </Suspense>
        </div>
        <AppFooter />
        <EUGDPR />
        <AnswerBoardInput />
        <AskingBoardInput />
        <CustomShare />
        <MessageItemMenu />
        <GlobalResultAlert />
        <TermsContainer />
        <SupportedLanguages />
        <GlobalLoading />
      </>
    );
  }
}

const mapStateToProps = state => ({
  navigation: getActiveNavigationStack(state)
});

const mapDispatchToProps = dispatch => ({
  showCustomShare: () => dispatch(customShareActions.showCustomShare()),
  initLoggedInUser: async () => await dispatch(initLoggedInUser()),
  notFound: () => dispatch(profileActions.notFound()),
  setIsAnswer: questionId => dispatch(answerActions.setIsAnswer(questionId)),
  alertSuccess: () => dispatch(answerActions.alertSuccess())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
