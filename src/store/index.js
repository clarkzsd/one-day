import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { saveState } from '../utils/localStorage';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState(store.getState().todos.data);
});

export default store;
