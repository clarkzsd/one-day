import { combineReducers } from 'redux';
import homeReducer from '../screens/TodoListScreen/reducer';
import projectReducer from '../screens/ProjectScreen/reducer';
import appReducer from '../screens/App/reducer';
import UIReducer from '../components/reducer';
import statisticsReducer from '../screens/StatisticsScreen/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  ui: UIReducer,
  project: projectReducer,
  statistics: statisticsReducer
});

export default rootReducer;
