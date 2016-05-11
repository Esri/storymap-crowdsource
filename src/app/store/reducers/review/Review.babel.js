import { combineReducers } from 'redux';
import {
  CHANGE_REVIEW_SELECTION,
  REVIEW_APPROVE_FEATURES,
  REVIEW_REJECT_FEATURES
} from 'babel/constants/actionsTypes/Review';

export const selection = function (state = 'new', action) {
  switch (action.type) {
    case CHANGE_REVIEW_SELECTION:
      return action.selection;
    default:
      return state;
  }
};

export const approved = function (state = [], action) {
  switch (action.type) {
    case REVIEW_APPROVE_FEATURES:
      let newState = [];

      if (action.parameters.add) {
        newState = [].concat(action.parameters.add).reduce((prev,current) => {
          if (state.indexOf(current) < 0) {
            return prev.concat(current);
          }
          return prev;
        },state);
      }
      if (action.parameters.remove) {
        newState = newState.filter((current) => {
          return [].concat(action.parameters.remove).indexOf(current) < 0;
        });
      }

      return newState;
    default:
      return state;
  }
};

export const rejected = function (state = [], action) {
  switch (action.type) {
    case REVIEW_REJECT_FEATURES:
      let newState = [];

      if (action.parameters.add) {
        newState = [].concat(action.parameters.add).reduce((prev,current) => {
          if (state.indexOf(current) < 0) {
            return prev.concat(current);
          }
          return prev;
        },state);
      }
      if (action.parameters.remove) {
        newState = newState.filter((current) => {
          return [].concat(action.parameters.remove).indexOf(current) < 0;
        });
      }

      return newState;
    default:
      return state;
  }
};

export const review = combineReducers({
  selection,
  approved,
  rejected
});

export default review;
