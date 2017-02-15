import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import createReducer from './createReducer';

export function configureStore(initialState) {
  const store = createStore(createReducer(), initialState, compose(
    applyMiddleware(
      thunk.withExtraArgument({ axios }),
    ),

    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ));

  store.asyncReducers = {};

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => store.replaceReducer(createReducer));
    }
  }

  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  /* eslint-disable no-param-reassign */
  store.asyncReducers[name] = asyncReducer;
  /* eslint-enable no-param-reassign */
  store.replaceReducer(createReducer(store.asyncReducers));
}
