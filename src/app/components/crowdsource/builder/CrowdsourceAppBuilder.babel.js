import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import Modal from 'babel/components/helper/modal/Modal';
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
    const modalClasses = Helper.classnames(['settings-modal']);
    const settingsModal = $.extend(true,{
      className: modalClasses
    },this.state.settingsModal);

    return (
      <div className={appClasses}>
        {this.props.bannerVisible ? <BuilderBanner brandOnly={this.state.hideBannerContent} /> : null}
        {this.state.settingsModal ? <Modal {...settingsModal} /> : null }
      </div>
    );
  }

}

CrowdsourceAppBuiler.propTypes = {
  bannerVisible: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
};

CrowdsourceAppBuiler.defaultProps = {
  bannerVisible: false,
  errorMessage: ''
};
