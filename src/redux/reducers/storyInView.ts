import {
  CHANGE_STORY_IN_VIEW_SUCCESS,
  StoryInViewState,
  StoryInViewActionTypes,
  CHANGE_STORY_IN_VIEW_REQUESTED,
} from '../actionTypes';

const initialState: StoryInViewState = {
  id: null,
  title: '',
  storyUrl: '',
  content: '',
  isLoading: false,
};

const storyInView = (
  state = initialState,
  action: StoryInViewActionTypes
): StoryInViewState => {
  switch (action.type) {
    case CHANGE_STORY_IN_VIEW_SUCCESS: {
      return {
        id: action.payload.id,
        title: action.payload.title,
        storyUrl: action.payload.storyUrl,
        content: action.payload.content,
        isLoading: false,
      };
    }
    case CHANGE_STORY_IN_VIEW_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return { ...state, isLoading: false };
    }
  }
};

export default storyInView;
