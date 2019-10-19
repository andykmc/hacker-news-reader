import { combineReducers } from 'redux';
import storyInView from './storyInView';

export const rootReducer = combineReducers({ storyInView });

export type AppState = ReturnType<typeof rootReducer>;
