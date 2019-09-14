import React from 'react';
import { connect } from 'react-redux';
import history from '~/routers/history';

import { getUnansweredQuestionsNumber } from '~/selectors/questions.selectors';
import { getNumberOfFriends } from '~/selectors/friends.selectors';
import { getLanguageSelector } from '~/selectors/language.selectors';
import { FRIENDS, HOME, PROFILE, QUESTIONS } from '~/constants/navigation.constants';
import authenticationActions from '~/actions/User/authentication.actions';
import Resources from '~/constants/Resources';
import { getActiveNavigationStack } from '~/selectors/app.selectors';
import { getUserPhotoSelector } from '~/selectors/user.selectors';
import UserUtils from "../../utils/User";

class Navigation extends React.PureComponent {
  onNavigate(destination) {
    if (!UserUtils.isLoggedIn()) {
      this.props.requireLogin();
      return;
    }

    history.push(destination);
  }

  render() {
    const { language, numberOfFriends, unansweredQuestionsNumber } = this.props;
    const { active } = this.props;

    return (
      <div className="navigation">
        <button
          type="button"
          onClick={() => this.onNavigate('/dashboard')}
          className={`navigation__button ${active === HOME && 'active'}`}
        >
          <span className="navigation__button-helper">
            <img
              src={`${window.askMe.config.urlStaticCdn}/images/askme/app/nav-home-icon${
                active === 'HOME' ? '-active' : ''
              }.png`}
              alt="Home"
            />
            <span>{language.navigation.home}</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => this.onNavigate('/questions')}
          className={`navigation__button ${active === QUESTIONS && 'active'}`}
        >
          <span className="navigation__button-helper">
            <img
              src={`${window.askMe.config.urlStaticCdn}/images/askme/app/nav-questions-icon${
                active === 'QUESTIONS' ? '-active' : ''
              }.png`}
              alt="Questions"
            />
            <span>{language.navigation.questions}</span>
            {unansweredQuestionsNumber > 0 && (
              <i className="navigation__badge">{unansweredQuestionsNumber}</i>
            )}
          </span>
        </button>
        <button
          type="button"
          onClick={() => this.onNavigate('/friends')}
          className={`navigation__button ${active === FRIENDS && 'active'}`}
        >
          <span className="navigation__button-helper">
            <img
              src={`${window.askMe.config.urlStaticCdn}/images/askme/app/nav-friends-icon${
                active === 'FRIENDS' ? '-active' : ''
              }.png`}
              alt="Following"
            />
            <span>{language.navigation.following}</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => this.onNavigate('/me')}
          className={`navigation__button ${active === PROFILE && 'active'}`}
        >
          <span className="navigation__button-helper">
            <img
              src={this.props.userPhoto || Resources.defaultAvatar}
              alt="Profile"
              className="navigation__profile-img"
            />
            <span>{language.navigation.profile}</span>
          </span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: getLanguageSelector(state),
  numberOfFriends: getNumberOfFriends(state),
  unansweredQuestionsNumber: getUnansweredQuestionsNumber(state),
  userPhoto: getUserPhotoSelector(state),
  active: getActiveNavigationStack(state) || HOME
});

const mapDispatchToProps = dispatch => ({
  requireLogin: () => dispatch(authenticationActions.requireLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
