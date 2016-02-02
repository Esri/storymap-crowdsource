import { combineReducers } from 'redux';
import components from './components/Components';
import fields from './fields/Fields';
import layout from './layout/Layout';

export const settings = combineReducers({
  components,
  fields,
  layout
});

export default settings;
