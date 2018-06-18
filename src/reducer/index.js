import { combineReducers } from 'redux';
import homeReducer from '../screens/TodoListScreen/reducer';
import UIReducer from '../components/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  ui: UIReducer
});

export default rootReducer;
