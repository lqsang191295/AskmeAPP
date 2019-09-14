import React from 'react';
import { connect } from 'react-redux';
import { getLanguageSelector } from '~/selectors/language.selectors';
import Profile from '~/dtos/Profile';
import Slider from 'react-slick';
import history from '~/routers/history';
import Resources from '~/constants/Resources';
import Device from '~/utils/Device';

const FriendItem = ({ item, onClick }) => {
  const user = new Profile(item);
  return (
    <div className="dashboard__friends-list">
      <div className="dashboard__friends-item animated fadeIn" onClick={() => onClick(item)}>
        <img src={user.getPhoto()} alt="Person" />
        <span className="dashboard__friends-item-name">{user.getName()}</span>
        <span className="dashboard__friends-item-like">
          @{user.getUsername() || user.getAlias()}
        </span>
      </div>
    </div>
  );
};

class Friends extends React.PureComponent {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  getSliderSettings = () => {
    let sliderSettings = {
      dots: false,
      className: 'center',
      centerMode: false,
      infinite: false,
      centerPadding: '85px',
      slidesToScroll: 3,
      speed: 900,
      arrows: false,
      touchThreshold: 120,
      swipeToSlide: false,
      easing: 'linear',
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToScroll: 3,
            centerPadding: '85px',
            slidesToShow: 3,
            dots: false
          }
        }
      ]
    };

    let platform = 'WEB';
    if (Device.isMobile()) platform = 'MOBILE';
    const { connectedUsers } = this.props;
    if (platform === 'WEB') {
      sliderSettings = {
        ...sliderSettings,
        // draggable: false,
        dots: false,
        arrows: true,
        slidesToScroll: 5,
        slidesToShow: 5
      };
    }

    const hasNoFriends =
      !connectedUsers || (Array.isArray(connectedUsers) && connectedUsers.length === 0);
    if (hasNoFriends) sliderSettings = { ...sliderSettings, infinite: false };

    const onlyOneFriend = Array.isArray(connectedUsers) && connectedUsers.length === 1;
    if (onlyOneFriend) {
      sliderSettings = { ...sliderSettings, slidesToScroll: 1, slidesToShow: 1, infinite: false };
    }

    return sliderSettings;
  };

  onClickFriend = item => {
    history.push(`/profile/${item.username || item.alias}`);
  };

  render() {
    const { friends, language } = this.props;
    const settings = this.getSliderSettings();

    if (!friends || friends.length === 0) {
      return null;
    }
    return (
      <div className="dashboard__panel dashboard__friends">
        <p className="dashboard__panel-title">
          <img src={Resources.love_homepage} alt="" />
          {language.common.peopleYouMayKnow}
        </p>
        <Slider {...settings} ref={slider => (this.slider = slider)}>
          {friends.map(item => {
            return <FriendItem item={item} key={item._id} onClick={this.onClickFriend} />;
          })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: getLanguageSelector(state)
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
