import { combineReducers } from 'redux';
import common from './common/Common';
import header from './header/Header';
import intro from './intro/Intro';
import map from './map/Map';

export const components = combineReducers({
  common,
  header,
  intro,
  map
});

export default components;
