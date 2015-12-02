import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import CrowdsourceAppBuilderController from 'babel/components/crowdsource/builder/CrowdsourceAppBuilderController';

// TRANSLATED TEXT STRINGS START
// TRANSLATED TEXT STRINGS END

export default class CrowdsourceAppBuiler extends React.Component {

  constructor(props) {
    super(props);

    this._controller = new CrowdsourceAppBuilderController();
    this._controller.on('state-change', (state) => {
      this.setState(state);
    });

    this.state = this._controller.appState;
  }

  componentDidMount() {
    this._controller.mount();
  }

  componentWillUnmount() {
    this._controller.unmount();
  }

  render() {

    const appClasses = Helper.classnames('crowdsource-builder');

    return (
      <div className={appClasses}>
        <BuilderBanner />
      </div>
    );
  }

}
