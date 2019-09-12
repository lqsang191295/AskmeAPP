import FlowController from './FlowController';
import { isUserLoggedIn } from '~/routers/AppRouter';
import history from '~/routers/history';
import routeHelpers from '~/routers/helpers';
import authenticationActions from '~/actions/User/authentication.actions';
import { customShareActions } from '~/actions/customShare.actions';
import { subscribePrivateChannel } from '~/routers/EventHandler';

class ShareFlowController extends FlowController {
  static flowType = 'sharing';

  static steps = {
    0: 'init',
    1: 'storeMessage',
    2: 'checkAuthenticate',
    3: 'checkUsername',
    4: 'showBoard',
    5: 'clearFlow'
  };

  constructor() {
    super(ShareFlowController.steps, ShareFlowController.flowType);
  }

  async run() {
    const step = super.getCurrentStep();
    const currentStep = ShareFlowController.steps[step];

    switch (currentStep) {
      case 'init':
      case 'storeMessage': {
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
        const language = window.getState().language.texts;
        const message = language.loginMethods.loginToShare;
        const method = 'SHARE_PROFILE';
        window.dispatch(authenticationActions.showMethods(message, method));
        return;
      }

      case 'checkUsername': {
        const { username, alias } = window.getState().user;
        if (username !== null || alias !== null) {
          super.nextStep();
          await this.run();
          break;
        }

        /*
         * Handle login
         */
        routeHelpers.redirectToSignUpPage(history);
        return;
      }

      case 'showBoard': {
        subscribePrivateChannel();
        await window.dispatch(customShareActions.display());

        super.nextStep();
        await this.run();
        break;
      }

      case 'clearFlow': {
        this.remove();
        break;
      }

      default:
        break;
    }
  }

  remove() {
    super.finish();
  }

  static isRunning() {
    return (
      FlowController.hasActiveFlow() &&
      FlowController.getActiveFlow() === ShareFlowController.flowType
    );
  }
}

export default ShareFlowController;
