import { combineReducers } from 'redux';
import {
  UPDATE_LAYOUT_ID
} from 'babel/constants/actionsTypes/Settings';

export const id = function (state = 'stacked', action) {
  switch (action.type) {
    case UPDATE_LAYOUT_ID:
      return action.id;
    default:
      return state;
  }
};

export const layout = combineReducers({
  id
});

export default layout;
