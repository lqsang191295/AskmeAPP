import React, { PureComponent } from 'react';
import TopNavigation from '~/components/Layout/TopNavigation';
import history from '~/routers/history';
import Tracker from '~/utils/Tracker';

class AppHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };

    this.lastScrollTop = 0;
  }

  UNSAFE_componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    history.listen((location, action) => {
      if (this.state.hidden) this.setState({ hidden: false });
      Tracker.pageview(location.pathname);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollTop = window.scrollY;

    // Set the state of hidden depending on scroll position
    // We only change the state if it needs to be changed
    if (!this.state.hidden && currentScrollTop > this.lastScrollTop && currentScrollTop > 10) {
      this.setState({ hidden: true });
    } else if (
      (this.state.hidden && currentScrollTop <= this.lastScrollTop) ||
      currentScrollTop <= 10
    ) {
      this.setState({ hidden: false });
    }

    this.lastScrollTop = currentScrollTop;
  };

  render() {
    return (
      <div className={`app-header ${this.state.hidden && 'off'}`}>
        <TopNavigation />
      </div>
    );
  }
}

export default AppHeader;
