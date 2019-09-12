import FlowController from './FlowController';
import askingActions from '~/actions/asking.actions';
import { isUserLoggedIn } from '~/routers/AppRouter';
import history from '~/routers/history';
import routeHelpers from '~/routers/helpers';
import authenticationActions from '~/actions/User/authentication.actions';

class QuestioningFlowController extends FlowController {
  static flowType = 'questioning';

  static steps = {
    0: 'init',
    1: 'storeMessage',
    2: 'checkAuthenticate',
    3: 'login',
    4: 'send',
    5: 'clearMessage'
  };

  constructor({ recipient, content } = {}) {
    super(QuestioningFlowController.steps, QuestioningFlowController.flowType);
    if (recipient) {
      super.store('recipient', recipient);
    }

    if (content) {
      super.store('content', content);
    }
  }

  async run() {
    const step = super.getCurrentStep();
    const currentStep = QuestioningFlowController.steps[step];
    switch (currentStep) {
      case 'init':
      case 'storeMessage': {
        this.storeMessage(super.get('content'));

        super.nextStep();
        await this.run();
        break;
      }

      case 'checkAuthenticate': {
        if (isUserLoggedIn()) {
          super.nextStep();
          await this.run();
          break;
        }

        /*
         * Handle show login popup screen
         */
        const data = FlowController.getStoredData();
        window.dispatch(askingActions.setInfo(data.content, data.recipient));
        window.dispatch(authenticationActions.showMethods(undefined, 'ASKING'));
        return;
      }

      case 'login': {
        if (isUserLoggedIn()) {
          super.nextStep();
          await this.run();
          break;
        }

        /*
         * Handle login
         */
        routeHelpers.redirectToLoginPage(history);
        return;
      }

      case 'send': {
        const data = {
          content: super.get('content'),
          recipient: super.get('recipient')
        };

        await window.dispatch(askingActions.sendQuestion(data));

        super.nextStep();
        await this.run();
        break;
      }

      case 'clearMessage': {
        this.remove();
        break;
      }

      default:
        break;
    }
  }

  storeMessage(message) {
    super.store('content', message);
  }

  remove() {
    super.clear('content');
    super.clear('recipient');
    super.finish();
  }

  static isRunning(userId = '') {
    const { recipient } = FlowController.getStoredData();
    return (
      FlowController.hasActiveFlow() &&
      FlowController.getActiveFlow() === QuestioningFlowController.flowType &&
      recipient &&
      recipient.userId === userId
    );
  }
}

export default QuestioningFlowController;
