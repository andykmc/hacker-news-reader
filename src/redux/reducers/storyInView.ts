import { CHANGE_STORY_IN_VIEW } from '../actionTypes';

const initialState = { id: null, storyUrl: '' };

const storyInView = (state = initialState, action) => {
  console.log('storyInView action', action);
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
