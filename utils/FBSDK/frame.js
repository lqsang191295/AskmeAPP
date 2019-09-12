import { ANSWER_SHARE, PROFILE_SHARE } from '~/constants/frame.constants';
import { getLanguageLocaleCode } from '~/helpers/Language/Language';
import NameUtils from '~/utils/Name';

const getWideFrameData = (type = PROFILE_SHARE, data = {}) => {
  switch (type) {
    case PROFILE_SHARE: {
      const { user, ...rest } = data;
      return {
        ...rest,
        userProfileImageUrl: user.photo,
        language: getLanguageLocaleCode(),
        username: user.username || user.alias
      };
    }

    case ANSWER_SHARE: {
      return {
        content: data.content,
        questionId: data._id,
        language: getLanguageLocaleCode(),
        name: NameUtils.getFirstName(data.name)
      };
    }

    default:
      return null;
  }
};

const FrameUtils = {
  getWideFrameData
};

export default FrameUtils;
