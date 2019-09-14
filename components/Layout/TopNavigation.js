import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '~/routers/history';
import { getQuestions, getQuestionsSent, questionsActions } from '~/actions/questions.actions';
import authenticationActions from '~/actions/User/authentication.actions';
import Resources from '~/constants/Resources';
import {
  getActiveNavigationStack,
  getAppExtraData,
  getTopNavigationTitle
} from '~/selectors/app.selectors';
import { getQuestionActiveTab, isUpdatingQuestionsList } from '~/selectors/questions.selectors';
import UserUtils from "../../utils/User";

const defaultNavigation = (
  <div className="top-navigation">
    <img
      className="top-navigation__logo"
      src={`${window.askMe.config.urlStaticCdn}/images/askme/logo.png`}
      alt="Logo"
    />
  </div>
);

export const goBack = () => {
  if (history.length <= 2) {
    history.push('/dashboard');
  } else {
    history.goBack();
  }
};

const handleRefresh = ({
  getQuestions,
  clearQuestions,
  clearQuestionsSent,
  getQuestionsSent,
  switchTab
}) => {
  const tabs = {
    QUESTIONS: 'QUESTIONS',
    NEW_REPLIES: 'NEW_REPLIES'
  };
  switch (switchTab) {
    case tabs.QUESTIONS: {
      clearQuestions();
      setTimeout(() => {
        if (typeof getQuestions === 'function') getQuestions();
      }, 0);
      break;
    }
    case tabs.NEW_REPLIES: {
      clearQuestionsSent();
      setTimeout(() => {
        if (typeof getQuestionsSent === 'function') getQuestionsSent();
      }, 0);
      break;
    }
    default: {
      getQuestions();
      break;
    }
  }
};

class TopNavigation extends Component {
  static defaultProps = { extraData: {} };

  handleGoBack = () => {
    if (!UserUtils.isLoggedIn()) {
      this.props.requireLogin();
      return;
    }

    goBack();
  };

  render() {
    const {
      title,
      getQuestions,
      clearQuestions,
      clearQuestionsSent,
      getQuestionsSent,
      navigation,
      extraData,
      switchTab,
      updatingQuestion
    } = this.props;
    return title ? (
      <div
        className={`top-navigation ${extraData.noShadow ? 'top_nav--no-shadow' : ''} ${
          extraData.home ? 'with-home' : ''
        } ${extraData.noBack === true ? 'no-back' : ''}
       ${navigation === 'PROFILE' ? 'top-navigation__profile-screen' : ''}
      `}
      >
        {extraData.noBack !== true && (
          <button type="button" onClick={this.handleGoBack} className="top-navigation__go-back">
            <img src={Resources.backIcon} alt="Back" />
          </button>
        )}
        {navigation !== 'PROFILE' && <p className="top-navigation__title">{title}</p>}
        {navigation === 'QUESTIONS' ? (
          <button
            type="button"
            onClick={() =>
              handleRefresh({
                getQuestions,
                clearQuestions,
                clearQuestionsSent,
                getQuestionsSent,
                switchTab
              })
            }
            className="top-navigation__go-back top-navigation__refresh"
          >
            <img
              src={Resources.refreshIcon}
              alt="Back"
              className={updatingQuestion ? 'questions-board--refresh-rotate' : ''}
            />
          </button>
        ) : null}
      </div>
    ) : (
      defaultNavigation
    );
  }
}

const mapStateToProps = state => ({
  title: getTopNavigationTitle(state),
  navigation: getActiveNavigationStack(state),
  extraData: getAppExtraData(state),
  switchTab: getQuestionActiveTab(state),
  updatingQuestion: isUpdatingQuestionsList(state)
});

const mapDispatchToProps = dispatch => ({
  getQuestions: userId => dispatch(getQuestions(userId, true)),
  clearQuestions: () => dispatch(questionsActions.clearQuestions()),
  clearQuestionsSent: () => dispatch(questionsActions.clearQuestionsSent()),
  getQuestionsSent: userId => dispatch(getQuestionsSent(userId)),
  requireLogin: () => dispatch(authenticationActions.requireLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavigation);
