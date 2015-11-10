import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import viewerText from 'i18n!translations/viewer/nls/template';

const titleAttrText = viewerText.social.buttonTitleAttr;

export const ShareButton = class ShareButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const shareClass = Helper.classnames([this.props.className, this.props.type, {
      'share': true,
      'share-btn': true,
      'text-btn': true
    }]);
    const icon = getIcon(this.props.type);
    const iconHtml = {
      __html: icon
    };

    return (
      <button className={shareClass} dangerouslySetInnerHTML={iconHtml} title={titleAttrText[this.props.type]} onClick={this.onShare.bind(this,this.props.type)}></button>
    );
  }

  onShare(type) {
    alert('TODO: share ' + type);
  }

};

ShareButton.propTypes = {
  type: React.PropTypes.string
};

ShareButton.defaultProps = {
  type: 'link'
};

export default ShareButton;
