import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Login from './login/Login';
import CrowdsourceForm from './form/CrowdsourceForm';

export default class ContributePanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const contributeClasses = Helper.classnames([this.props.className,this.props.classNames,
      'contribute-panel',
      'container-fluid'
    ]);

    return (
      <div className={contributeClasses}>
        { !this.props.user.authenticated || this.props.view === 'login' ? <Login {...this.props}/> : null }
        { this.props.user.authenticated && this.props.user.contributor && this.props.view === 'form' ? <CrowdsourceForm {...this.props}/> : null }
      </div>
    );
  }

}

ContributePanel.propTypes = {
  user: React.PropTypes.shape({
    authenticated: React.PropTypes.bool,
    contributer: React.PropTypes.bool
  }).isRequired,
  socialLogin: React.PropTypes.bool.isRequired,
  view: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  fields: React.PropTypes.shape({}).isRequired,
  fieldDefinitions: React.PropTypes.array.isRequired,
  map: React.PropTypes.shape({}).isRequired,
  closeAction: React.PropTypes.func.isRequired,
  saveAction: React.PropTypes.func.isRequired
};

ContributePanel.defaultProps = {
  closeAction: () => {},
  saveAction: () => {}
};
