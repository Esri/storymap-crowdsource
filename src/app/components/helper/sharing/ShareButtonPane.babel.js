import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import ShareButton from 'babel/components/helper/sharing/ShareButton';

export const ShareButtonPane = class ShareButtonPane extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const shareClass = Helper.classnames([this.props.className, {
      'sharing-buttons': true
    }]);
    const facebookBtn = this.props.social.facebook ? <ShareButton type="facebook" /> : null;
    const twitterBtn = this.props.social.twitter ? <ShareButton type="twitter" /> : null;
    const linkBtn = this.props.social.link ? <ShareButton type="link" /> : null;

    return (
      <span className={shareClass}>
        {facebookBtn}{twitterBtn}{linkBtn}
      </span>
    );
  }
};

ShareButtonPane.propTypes = {
  social: React.PropTypes.shape({
    facebook: React.PropTypes.bool,
    twitter: React.PropTypes.bool,
    link: React.PropTypes.bool
  })
};

ShareButtonPane.defaultProps = {
  social: {
    facebook: false,
    twitter: false,
    link: false
  }
};

export default ShareButtonPane;
