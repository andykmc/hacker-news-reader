import {
  CHANGE_STORY_IN_VIEW_SUCCESS,
  StoryInView,
  StoryInViewActionTypes,
  CHANGE_STORY_IN_VIEW_REQUESTED,
  CHANGE_STORY_IN_VIEW_FAILED,
} from './actionTypes';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { AnyAction } from 'redux';

const requestedAction = () => ({
  type: CHANGE_STORY_IN_VIEW_REQUESTED,
});

export const changeStoryInViewAction = ({
  id,
  storyUrl,
}: StoryInView) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(requestedAction());

  try {
    const response = await axios.post('/api/storyContent', {
      url: storyUrl,
    });
    const { title, content } = response.data;
    const payload = { id, storyUrl, title, content };
    dispatch({ type: CHANGE_STORY_IN_VIEW_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: CHANGE_STORY_IN_VIEW_FAILED });
  }
};
