import { combineReducers } from 'redux';
import newsInView from './newsInView';
import newsList from './newsList';

export const rootReducer = combineReducers({ newsInView, newsList });

export type AppState = ReturnType<typeof rootReducer>;
