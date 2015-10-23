import React from 'react';
import ShareButton from 'babel/components/sharing/ShareButton';

export const ShareButtonPane = class ShareButtonPane extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const facebookBtn = this.props.social.facebook ? <ShareButton type="facebook" /> : null;
    const twitterBtn = this.props.social.twitter ? <ShareButton type="twitter" /> : null;
    const bitlyBtn = this.props.social.bitly ? <ShareButton type="bitly" /> : null;

    return (
      <span className="sharing-buttons">
        {facebookBtn}{twitterBtn}{bitlyBtn}
      </span>
    );
  }
};

ShareButtonPane.propTypes = {
  social: React.PropTypes.shape({
    facebook: React.PropTypes.bool,
    twitter: React.PropTypes.bool,
    bitly: React.PropTypes.bool
  })
};

ShareButtonPane.defaultProps = {
  social: {
    facebook: false,
    twitter: false,
    bitly: false
  }
};

export default ShareButtonPane;
