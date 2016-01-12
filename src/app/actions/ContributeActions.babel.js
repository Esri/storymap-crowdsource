import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

export const ContributeActions = {

  startContributing: function() {

    AppDispatcher.dispatch({
      type: ActionTypes.contribute.START
    });

  }

};
export default ContributeActions;
