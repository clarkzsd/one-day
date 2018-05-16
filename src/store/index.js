import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { saveState } from '../utils/localStorage';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

store.subscribe(throttle(() => {
  saveState(store.getState().todos.data);
}, 1000));

const createStoreWithInitialState = (initialState) => createStore(rootReducer, initialState);

export {
  store,
  createStoreWithInitialState
};
