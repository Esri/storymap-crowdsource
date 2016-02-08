import { combineReducers } from 'redux';
import common from './common/Common';
import contribute from './contribute/Contribute';
import gallery from './gallery/Gallery';
import header from './header/Header';
import intro from './intro/Intro';
import map from './map/Map';

export const components = combineReducers({
  common,
  contribute,
  gallery,
  header,
  intro,
  map
});

export default components;
