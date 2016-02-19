import React from 'react';
import Helper from 'babel/utils/helper/Helper';

export default class SelectedShares extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const mainClasses = Helper.classnames([this.props.className,this.props.classNames,
      'selected-shares',
      'overlay-panel'
    ]);

    return (
      <div className={mainClasses}>
      </div>
    );
  }

}

SelectedShares.propTypes = {
  closeAction: React.PropTypes.func
};

SelectedShares.defaultProps = {
  saveAction: () => {}
};
