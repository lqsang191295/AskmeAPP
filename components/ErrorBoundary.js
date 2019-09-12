import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import Resources from '~/constants/Resources';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  componentDidCatch(error, info) {
    const { disabled } = window.askMe.config.sentry;
    if (disabled) return;

    // You can also log the error to an error reporting service
    Sentry.withScope(scope => {
      scope.setExtra('info', info);
      scope.setExtra('state', window.getState());
      Sentry.captureException(error);
    });

    let errorMessage = '';
    if (window.askMe.config.env !== 'production') {
      errorMessage = error ? JSON.stringify(error) : '';
    }
    this.setState(() => ({
      hasError: true,
      errorMessage
    }));

    const { url } = window.askMe.config;
    if (window.askMe.config.env === 'production') {
      window.location.href = `${url}/404?error_code=500`;
    }
  }

  render() {
    const { props, state } = this;
    const { hasError, errorMessage } = state;
    const divStyle = {
      overflow: 'scroll',
      border: '1px solid red'
    };

    if (hasError) {
      return <div style={divStyle}>{errorMessage}</div>;
    }

    return props.children;
  }
}

export default ErrorBoundary;
