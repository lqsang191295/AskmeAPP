import { defaultSettingsConstants } from '../constants/defaultSettings.constants';
import { USER_ADD_CONNECTION, UPDATE_USER_SETTING } from '../constants/ActionTypes';
import UserUtils from '../utils/User';

const initialState = { settings: defaultSettingsConstants };

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD_CONNECTION: {
      return state;
    }

    case UPDATE_USER_SETTING: {
      const settings = { ...state.settings, ...action.settings };
      return {
        ...state,
        settings
      };
    }
    default:
      return state;
  }
};
