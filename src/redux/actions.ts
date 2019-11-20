import {
  CHANGE_NEWS_IN_VIEW_SUCCESS,
  NewsInView,
  CHANGE_NEWS_IN_VIEW_REQUESTED,
  CHANGE_NEWS_IN_VIEW_FAILED,
  GET_NEWS_LIST_REQUESTED,
  GET_NEWS_LIST_SUCCESS,
  GET_NEWS_LIST_FAILED,
} from './actionTypes';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { AnyAction } from 'redux';
import { getAllTopNews } from '../lib/apiClient';

const requestedNewsInView = () => ({
  type: CHANGE_NEWS_IN_VIEW_REQUESTED,
});

export const changeNewsInViewAction = ({ id }: NewsInView) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(requestedNewsInView());

  try {
    const response = await axios.post('/api/newsContent', {
      id,
    });
    const { url, title, content } = response.data;
    const payload = { id, newsUrl: url, title, content };
    dispatch({ type: CHANGE_NEWS_IN_VIEW_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: CHANGE_NEWS_IN_VIEW_FAILED });
  }
};

const requestedNewsList = () => ({
  type: GET_NEWS_LIST_REQUESTED,
});

export const getNewsListAction = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(requestedNewsList());

  try {
    const items = await getAllTopNews();
    const payload = { list: items };
    dispatch({ type: GET_NEWS_LIST_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: GET_NEWS_LIST_FAILED });
  }
};
