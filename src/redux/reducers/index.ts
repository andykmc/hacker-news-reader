import { combineReducers } from 'redux';
import newsInView from './newsInView';

export const rootReducer = combineReducers({ newsInView });

export type AppState = ReturnType<typeof rootReducer>;
