import { createStore } from 'lib/redux/index';
import { combineReducers } from 'lib/redux/index';
import items from './reducers/items/Items';

const crowdsourceApp = combineReducers({
  items
});

export const crowdsourceStore = createStore(crowdsourceApp);

export default crowdsourceStore;
