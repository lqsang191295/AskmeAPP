import * as Sentry from '@sentry/browser';

// Set user information, as well as tags and further extras
Sentry.configureScope(scope => {
  scope.setUser({
    id: '2019',
  });
});

export const crashReporter = store => next => async action => {
  try {
    return await next(action);
  } catch (error) {
    Sentry.withScope(scope => {
      scope.setExtra('action', action);
      scope.setExtra('state', store.getState());
      Sentry.captureException(error);
    });
  }
};
