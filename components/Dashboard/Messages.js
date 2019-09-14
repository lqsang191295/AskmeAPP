import React, { PureComponent } from 'react';
import history from '~/routers/history';
import { getYourQuestions } from '~/selectors/questions.selectors';
import MessageItem from '~/components/Messages/MessageItem';
import { connect } from 'react-redux';
import { getLanguageSelector } from '~/selectors/language.selectors';

class Messages extends PureComponent {
  render() {
    const { yourQuestions, language } = this.props;
    if (yourQuestions.length === 0) return null;

    const questions = yourQuestions.slice(0, 2);

    return (
      <div className="dashboard__panel dashboard__messages">
        <p className="dashboard__panel-title">{language.common.questions}</p>
        <div className="messages__list">
          {questions.map(item => (
            <MessageItem
              key={item._id}
              id={item._id}
              isAnswered={item.isAnswered}
              content={item.content}
              isBlocked={item.block}
              createdAt={item.createdAt}
            />
          ))}

          <div className="messages__item-more">
            <button
              type="button"
              onClick={() => history.push('/questions')}
              className="messages__item-more"
            >
              {language.common.more}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: getLanguageSelector(state),
  yourQuestions: getYourQuestions(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
