import {
  CHANGE_STORY_IN_VIEW,
  StoryInView,
  StoryInViewActionTypes,
} from './actionTypes';

export const changeStoryInViewAction = ({
  id,
  storyUrl,
}: StoryInView): StoryInViewActionTypes => {
  return {
    type: CHANGE_STORY_IN_VIEW,
    payload: { id, storyUrl },
  };
};
