import Cookies from '~/utils/Cookie';
import { isJSON } from '~/utils/Common';

const PREFIX = 'askme_stg_f_';
const getCrossDomain = () => `.${window.askMe.config.noProtocolUrl}`;

const getStoredData = key => {
  const data = Cookies.get(`${PREFIX}_${key}`);
  return isJSON(data) ? JSON.parse(data) : null;
};

class FlowController {
  constructor(steps, flowType) {
    this.steps = steps;
    this.flowType = flowType;
    this.store('active_flow', flowType);
    this.currentStep = Cookies.get(`${PREFIX}_currentStep`) || 1;
  }

  store(key, data) {
    this[key] = data;
    const value = JSON.stringify(data);
    Cookies.set(`${PREFIX}_${key}`, value, 1 / 24, getCrossDomain());
  }

  get(key) {
    const value = Cookies.get(`${PREFIX}_${key}`);
    return this[key] || JSON.parse(value);
  }

  clear(key) {
    this[key] = undefined;
    Cookies.remove(`${PREFIX}_${key}`);
  }

  getCurrentStep() {
    return this.currentStep;
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
    return this;
  }

  finish() {
    this.clear('active_flow');
  }

  static hasActiveFlow() {
    return !!Cookies.get(`${PREFIX}_active_flow`);
  }

  static getActiveFlow() {
    const activeFlow = Cookies.get(`${PREFIX}_active_flow`);
    return activeFlow ? JSON.parse(activeFlow) : null;
  }

  static getStoredData() {
    return {
      content: getStoredData('content'),
      recipient: getStoredData('recipient')
    };
  }

  static isRunning() {
    return this;
  }
}

export default FlowController;
