import {
  CHANGE_STORY_IN_VIEW,
  StoryInViewState,
  StoryInViewActionTypes,
} from '../actionTypes';

const initialState: StoryInViewState = { id: null, storyUrl: '' };

const storyInView = (
  state = initialState,
  action: StoryInViewActionTypes
): StoryInViewState => {
  switch (action.type) {
    case CHANGE_STORY_IN_VIEW: {
      return { id: action.payload.id, storyUrl: action.payload.storyUrl };
    }
    default: {
      return state;
    }
  }
};

export default storyInView;
