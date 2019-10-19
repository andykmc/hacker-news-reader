import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './reducers';

export default createStore(rootReducer, devToolsEnhancer({}));
