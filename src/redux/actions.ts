import { CHANGE_STORY_IN_VIEW } from './actionTypes';

export const changeStoryInViewAction = ({ id, storyUrl }) => {
  return {
    type: CHANGE_STORY_IN_VIEW,
    payload: { id, storyUrl },
  };
};
