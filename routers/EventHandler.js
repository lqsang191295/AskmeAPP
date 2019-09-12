// import streamClient from '~/api/clients/stream';
// import { getCountryCode, getLanguageCode } from '~/utils/Common';
// import { getLanguageLocaleCode } from '~/helpers/Language/Language';
// import { setLanguage } from '~/actions/User/user.actions';
// import { getQuestionCounts } from '~/actions/questions.actions';
// import appActions from '~/actions/app.actions';
// import imageActions from '~/actions/image.actions';
// import UserUtils from '~/utils/User';
// import { RENDER_ANSWER_FINISHED, RENDER_PROFILE_FINISHED } from '~/constants/EventTypes';
//
// export const getPrivateChannel = () => UserUtils.getToken();
//
// const init = (dispatch, languageCode) => {
//   dispatch(setLanguage(languageCode));
//   dispatch(appActions.setCore(languageCode));
//   dispatch(getQuestionCounts());
// };
//
// export default dispatch => {
//   /**
//    * Init dispatching
//    */
//   let languageCode = getLanguageLocaleCode();
//   init(dispatch, languageCode);
//   if (!languageCode) {
//     getCountryCode().then(result => {
//       languageCode = getLanguageCode(result);
//       init(dispatch, languageCode);
//     });
//   }
//
//   streamClient.addListener(RENDER_PROFILE_FINISHED, payload => {
//     dispatch(imageActions.receivedRenderProfile(payload));
//   });
//
//   streamClient.addListener(RENDER_ANSWER_FINISHED, payload => {
//     dispatch(imageActions.receivedRenderQuestion(payload));
//   });
// };
//
// export const subscribePrivateChannel = () => {
//   streamClient.subscribe(getPrivateChannel());
//   streamClient.connect();
// };
//
// export const unsubscribePrivateChannel = () => {
//   streamClient.unsubscribe(getPrivateChannel());
//   streamClient.connect();
// };

export default function() {
  return null;
}
