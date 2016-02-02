import React from 'react';
import { Provider } from 'reactRedux';
import CrowdsourceApp from './CrowdsourceApp';
import AppStore from 'babel/store/AppStore';

console.log(AppStore.getState());

export default class CrowdsourceContainer extends React.Component {

  render() {

    return (
      <Provider store={AppStore}>
        <CrowdsourceApp></CrowdsourceApp>
      </Provider>
    );
  }

}
