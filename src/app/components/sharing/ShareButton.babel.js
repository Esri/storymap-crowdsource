import React from 'react';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';

export const ShareButton = class ShareButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const classList = 'share ' + this.props.type;
    const icon = getIcon(this.props.type);
    const iconHtml = {
      __html: icon
    };

    return (
      <span className={classList} dangerouslySetInnerHTML={iconHtml}></span>
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
