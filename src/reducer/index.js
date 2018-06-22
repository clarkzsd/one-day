import { combineReducers } from 'redux';
import homeReducer from '../screens/TodoListScreen/reducer';
import projectReducer from '../screens/ProjectScreen/reducer';

import UIReducer from '../components/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  ui: UIReducer,
  project: projectReducer
});

export default rootReducer;
