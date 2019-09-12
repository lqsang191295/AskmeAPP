import ReactGA from 'react-ga';

const userBehavior = (category, action, value, label = null) => {
  if (!category || !action) return;

  ReactGA.event({
    category,
    action,
    value,
    label: label || action
  });
};

function init() {
  const options = {
    debug: false,
    testMode: false
  };

  ReactGA.initialize(window.askMe.config.googleAnalyticsId, options);
}

function pageview(path) {
  ReactGA.pageview(path);
}

function modal(name) {
  if (!name) return;
  ReactGA.modalview(name);
}

function setUser({ userId, name }) {
  if (!userId) return;
  ReactGA.set({ userId, name });
}

const Tracker = {
  userBehavior,
  init,
  setUser,
  modal,
  pageview
};

export default Tracker;
