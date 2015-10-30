import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';

export const ShareButton = class ShareButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const shareClass = Helper.classnames([this.props.className, this.props.type, {
      share: true
    }]);
    const icon = getIcon(this.props.type);
    const iconHtml = {
      __html: icon
    };

    return (
      <span className={shareClass} dangerouslySetInnerHTML={iconHtml}></span>
    );
  }

};

ShareButton.propTypes = {
  type: React.PropTypes.string
};

ShareButton.defaultProps = {
  type: 'bitly'
};

export default ShareButton;
