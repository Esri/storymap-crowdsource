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
    const facebookBtn = this.props.config.services.facebook ? <ShareButton type="facebook" appId={this.props.config.appIds.facebook} /> : null;
    const twitterBtn = this.props.config.services.twitter ? <ShareButton type="twitter" twitter={this.props.config.twitter} /> : null;
    const linkBtn = this.props.config.services.link ? <ShareButton type="link" shareLinkAction={this.props.config.shareLinkAction} /> : null;

    return (
      <span className={shareClass}>
        {facebookBtn}{twitterBtn}{linkBtn}
      </span>
    );
  }
};

ShareButtonPane.propTypes = {
  config: React.PropTypes.shape({
    services: React.PropTypes.shape({
      facebook: React.PropTypes.bool,
      twitter: React.PropTypes.bool,
      link: React.PropTypes.bool
    }),
    appIds: React.PropTypes.shape({
      facebook: React.PropTypes.string
    }),
    twitter: React.PropTypes.shape({
      hashtags: React.PropTypes.string,
      text: React.PropTypes.string,
      twitterHandle: React.PropTypes.string
    })
  })
};

ShareButtonPane.defaultProps = {
  config: {
    services: {
      facebook: false,
      twitter: false,
      link: false
    }
  }
};

export default ShareButtonPane;
