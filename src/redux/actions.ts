import {
  CHANGE_NEWS_IN_VIEW_SUCCESS,
  NewsInView,
  NewsInViewActionTypes,
  CHANGE_NEWS_IN_VIEW_REQUESTED,
  CHANGE_NEWS_IN_VIEW_FAILED,
} from './actionTypes';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { AnyAction } from 'redux';

const requestedAction = () => ({
  type: CHANGE_NEWS_IN_VIEW_REQUESTED,
});

export const changeNewsInViewAction = ({ id, newsUrl }: NewsInView) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(requestedAction());

  try {
    const response = await axios.post('/api/newsContent', {
      url: newsUrl,
    });
    const { title, content } = response.data;
    const payload = { id, newsUrl, title, content };
    dispatch({ type: CHANGE_NEWS_IN_VIEW_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: CHANGE_NEWS_IN_VIEW_FAILED });
  }
};
