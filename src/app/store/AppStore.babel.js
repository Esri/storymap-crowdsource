/*eslint no-console: 0*/
import { createStore, combineReducers, applyMiddleware } from 'redux';
import app from './reducers/app/App';
import builder from 'mode!isBuilder?./reducers/builder/Builder';
import config from './reducers/config/Config';
import items from './reducers/items/Items';
import mode from './reducers/mode/Mode';
import review from 'mode!isBuilder?./reducers/review/Review';
import user from './reducers/user/User';

const crowdsourceApp = combineReducers({
  app,
  builder,
  config,
  items,
  mode,
  review,
  user
});

const logger = function({ getState }) {
  return (next) => (action) => {
    let returnValue = next(action);

    if (window.app.mode.isDebug) {
      console.log('Will dispatch', action);
      console.log('State after dispatch', getState());
    }

    return returnValue;
  };
};

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export const crowdsourceStore = createStoreWithMiddleware(crowdsourceApp);

export default crowdsourceStore;
