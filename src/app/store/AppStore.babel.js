import { createStore, combineReducers } from 'redux';
import app from './reducers/app/App';
import builder from 'mode!isBuilder?./reducers/builder/Builder';
import config from './reducers/config/Config';
import items from './reducers/items/Items';
import map from './reducers/map/Map';
import mode from './reducers/mode/Mode';
import user from './reducers/user/User';

const crowdsourceApp = combineReducers({
  app,
  builder,
  config,
  items,
  map,
  mode,
  user
});

export const crowdsourceStore = createStore(crowdsourceApp);

export default crowdsourceStore;
