import {
  CHANGE_NEWS_IN_VIEW_SUCCESS,
  NewsInViewState,
  NewsInViewActionTypes,
  CHANGE_NEWS_IN_VIEW_REQUESTED,
} from '../actionTypes';

const initialState: NewsInViewState = {
  id: null,
  title: '',
  storyUrl: '',
  content: '',
  isLoading: false,
};

const newsInView = (
  state = initialState,
  action: NewsInViewActionTypes
): NewsInViewState => {
  switch (action.type) {
    case CHANGE_NEWS_IN_VIEW_SUCCESS: {
      return {
        id: action.payload.id,
        title: action.payload.title,
        storyUrl: action.payload.storyUrl,
        content: action.payload.content,
        isLoading: false,
      };
    }
    case CHANGE_NEWS_IN_VIEW_REQUESTED: {
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

export default newsInView;
