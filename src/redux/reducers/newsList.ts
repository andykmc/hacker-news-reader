import {
  NewsListState,
  NewsListActionTypes,
  GET_NEWS_LIST_REQUESTED,
  GET_NEWS_LIST_SUCCESS,
} from '../actionTypes';

const initialState: NewsListState = { list: [], isLoading: false };

const newsList = (
  state = initialState,
  action: NewsListActionTypes
): NewsListState => {
  switch (action.type) {
    case GET_NEWS_LIST_SUCCESS: {
      return { list: action.payload.list, isLoading: false };
    }
    case GET_NEWS_LIST_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return {
        ...state,
        isLoading: false,
      };
    }
  }
};

export default newsList;
