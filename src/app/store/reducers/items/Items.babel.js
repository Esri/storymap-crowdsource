import { combineReducers } from 'redux';
import app from './app/App';
import featureService from 'mode!isBuilder?./featureService/FeatureService';
import webmap from 'mode!isBuilder?./webmap/Webmap';

export const items = combineReducers({
  app,
  featureService,
  webmap
});

export default items;
