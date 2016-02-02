import { createStore, combineReducers } from 'redux';
import builder from 'mode!isBuilder?./reducers/builder/Builder';
import config from './reducers/config/Config';
import items from './reducers/items/Items';
import mode from './reducers/mode/Mode';
import user from './reducers/user/User';

const crowdsourceApp = combineReducers({
  builder,
  config,
  items,
  mode,
  user
});

export const crowdsourceStore = createStore(crowdsourceApp);

export default crowdsourceStore;
