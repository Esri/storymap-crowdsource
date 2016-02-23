import { combineReducers } from 'redux';
import common from './common/Common';
import contribute from './contribute/Contribute';
import gallery from './gallery/Gallery';
import header from './header/Header';
import intro from './intro/Intro';
import map from './map/Map';
import shareDisplay from './shareDisplay/ShareDisplay';

export const components = combineReducers({
  common,
  contribute,
  gallery,
  header,
  intro,
  map,
  shareDisplay
});

export default components;
