import { combineReducers } from 'redux';
import components from './components/Components';
import layout from './layout/Layout';

export const settings = combineReducers({
  components,
  layout
});

export default settings;
