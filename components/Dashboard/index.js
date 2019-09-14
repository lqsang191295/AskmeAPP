import React from 'react';
import { connect } from 'react-redux';
import { HOME } from '~/constants/navigation.constants';
import { customShareActions } from '~/actions/customShare.actions';
import { getQuestions } from '~/actions/questions.actions';
import appActions from '~/actions/app.actions';
import {
  getUnansweredQuestionsNumber,
  isUserHasNoQuestions,
  isUserHasQuestionsSelector
} from '~/selectors/questions.selectors';
import { getUserSelector } from '~/selectors/user.selectors';
import { getLanguageCodeSelector, getLanguageSelector } from '~/selectors/language.selectors';
import Journey from '~/components/Dashboard/Journey';
import Resources from '~/constants/Resources';
import ErrorBoundary from '~/components/ErrorBoundary';
import Tracker from '~/utils/Tracker';
import Friends from '~/components/Dashboard/Friends';
import profileActions from '~/actions/Profile/profile.actions';
import { getConnectedUsers } from '~/selectors/users.selectors';
import Slider from 'react-slick';
import { HEIGHT_OF_DEVICE } from '~/constants/Variables';
import Device from '~/utils/Device';

const ShareButton = ({ language, showCustomShare }) => (
  <button type="button" className="share-encourage__button" onClick={showCustomShare}>
    <img
      alt={language.common.shareYourLink}
      className="image-icon-share-common"
      src={Resources.shareLink}
    />
    <span className="dashboard__post-button-text">{language.common.shareYourLink}</span>
  </button>
);

class DashboardPage extends React.PureComponent {
  UNSAFE_componentWillMount() {
    const extraData = { noShadow: true, noBack: true };
    const { language } = this.props;
    this.props.setNavigationChanges(HOME, language.navigation.home, extraData);
  }

  componentDidMount() {
    if (this.props.user.userId) {
      this.props.getQuestions();
      this.props.getFriends();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.friends && prevProps.friends.length > 0) {
      this.props.setNavigationChanges(HOME, this.props.language.navigation.home, {
        home: true,
        noBack: true
      });
    }
  }

  onShare = () => {
    this.props.showCustomShare();
    Tracker.userBehavior('Share', 'Share on Dashboard', 1, 'Share on Dashboard');
  };

  getSliderSettings = () => ({
    dots: false,
    className: 'center',
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    touchThreshold: 120,
    swipeToSlide: false,
    easing: 'linear',
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000
  });

  render() {
    const { language, friends } = this.props;
    const heightOfDevice = Device.getHeight();
    const settings = this.getSliderSettings();
    return (
      <ErrorBoundary>
        <div className="dashboard background-01 animated fadeIn">
          <div className={heightOfDevice >= HEIGHT_OF_DEVICE ? 'journey' : null}>
            {friends && friends.length > 0 && (
              <>
                <div className="dashboard__panel-welcome-img">
                  <img src={Resources.blueLogo} alt="Ask Me" className="dashboard__invite-logo" />
                </div>
                <Friends friends={friends} />
                <div className="questions-board__no-questions-section">
                  <div className="dashboard__invite">
                    <div className="dashboard__invite-text">
                      <Slider {...settings} ref={slider => (this.slider = slider)}>
                        <span className="questions-board__no-question">
                          {language.welcome.welcome01}
                        </span>
                        <span className="questions-board__no-question">
                          {language.welcome.welcome02}
                        </span>
                        <span className="questions-board__no-question">
                          {language.welcome.welcome03}
                        </span>
                      </Slider>
                      <img src={Resources.dash_arrow_homepage} alt="" />
                    </div>
                  </div>
                  <ShareButton language={language} showCustomShare={this.onShare} />
                </div>
              </>
            )}
            {(!friends || friends.length === 0) && <Journey />}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  user: getUserSelector(state),
  language: getLanguageSelector(state),
  hasNoQuestions: isUserHasNoQuestions(state),
  unansweredQuestionsNumber: getUnansweredQuestionsNumber(state),
  isUserHasQuestions: isUserHasQuestionsSelector(state),
  languageCode: getLanguageCodeSelector(state),
  friends: getConnectedUsers(state)
});

const mapDispatchToProps = dispatch => ({
  setNavigationChanges: (navigation, title, extraData) =>
    dispatch(appActions.setNavigationChanges(navigation, title, extraData)),
  showCustomShare: () => dispatch(customShareActions.showCustomShare()),
  getQuestions: userId => dispatch(getQuestions(userId)),
  getFriends: () => dispatch(profileActions.getFriends())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
