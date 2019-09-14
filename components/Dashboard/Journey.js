import React from 'react';
import { connect } from 'react-redux';
import { getLanguageSelector } from '~/selectors/language.selectors';
import { customShareActions } from '~/actions/customShare.actions';
import Resources from '~/constants/Resources';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { getGuide, setGuide } from '~/helpers/Guide/Guide';
import Tracker from '~/utils/Tracker';

export const TooltipText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  max-width: 20rem;
  text-align: center;
`;

class Journey extends React.PureComponent {
  constructor(props) {
    super(props);
    this.shareButtonRef = React.createRef();
    this.state = {
      isShowGuide: true
    };
  }

  componentDidMount() {
    const messageGuide = getGuide('message_guide_share_button');
    if (messageGuide) {
      this.setState({ isShowGuide: false });
    } else {
      setTimeout(() => {
        const { language } = this.props;
        setGuide('message_guide_share_button', language.messageGuide.shareButton);
        ReactTooltip.show(this.shareButtonRef);
      }, 1000);
    }
  }

  onShare = () => {
    this.props.showCustomShare();
    this.setState({ isShowGuide: false });
    Tracker.userBehavior('Share', 'Share on Journey', 1, 'Share on Journey');
  };

  render() {
    const { props } = this;
    const { language } = this.props;
    const { isShowGuide } = this.state;

    return (
      <div className="journey">
        <img src={Resources.emptyStateDashboard} alt="Home" className="journey__image" />
        <div className="journey__entities">
          <div className="journey__title">{language.dashBoard.startYourJourneyText}</div>
          <button
            ref={ref => (this.shareButtonRef = ref)}
            data-tip
            data-for="share-suggestion"
            type="button"
            className="share-encourage__button"
            onClick={this.onShare}
          >
            <img
              alt={language.common.shareYourLink}
              className="image-icon-share-common"
              src={Resources.shareLink}
            />
            <span className="dashboard__post-button-text">{language.common.shareYourLink}</span>
          </button>
          <ReactTooltip
            id="share-suggestion"
            className="guidance__tooltip"
            place="top"
            type="dark"
            effect="solid"
            disable={!isShowGuide}
            afterShow={this.afterShowGuide}
          >
            <TooltipText>{language.messageGuide.shareButton}</TooltipText>
          </ReactTooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: getLanguageSelector(state)
});

const mapDispatchToProps = dispatch => ({
  showCustomShare: () => dispatch(customShareActions.showCustomShare())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Journey);
