import $ from 'jquery';
import React from 'react';
import URI from 'lib/urijs/src/URI';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import viewerText from 'i18n!translations/viewer/nls/template';

const titleAttrText = viewerText.social.buttonTitleAttr;

export const ShareButton = class ShareButton extends React.Component {

  constructor(props) {
    super(props);

    // Autobind methods
    this.shareFacebook = this.shareFacebook.bind(this);
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
    switch (type) {
      case 'facebook':
        this.shareFacebook();
        break;
      case 'twitter':
        this.shareTwitter();
        break;
    }
  }

  shareFacebook() {
    const urlParams = {
      app_id: this.props.appId, // eslint-disable-line camelcase
      display: 'popup',
      href: this.sharingUrl
    };

    window.open('https://www.facebook.com/dialog/share?' + $.param(urlParams),'_blank','toolbar=0,status=0,width=626,height=436');
  }

  shareTwitter() {
    const urlParams = {
      text: this.props.twitter.text,
      related: 'EsriStoryMaps',
      url: this.sharingUrl
    };

    if (this.props.twitter.hashtags.length > 0) {
      urlParams.hashtags = this.props.twitter.hashtags;
    }
    if (this.props.twitter.twitterHandle.length > 0) {
      urlParams.via = this.props.twitter.twitterHandle.search('@') === 0 ? this.props.twitter.twitterHandle.slice(1) : this.props.twitter.twitterHandle;
    }

    window.open('https://twitter.com/intent/tweet?' + $.param(urlParams),'_blank','toolbar=0,status=0,width=550,height=420');
  }

  get sharingUrl() {
    if (window.location.href.match('localhost')) {
      alert(viewerText.errors.sharing.localhost); // eslint-disable-line no-alert
      return 'http://www.example.com';
    } else {
      const url = new URI(window.location.href);

      url.filename('index.html');
      url.removeSearch('edit','debug','fromscratch','fromScratch');

      return url.href;
    }
  }

};

ShareButton.propTypes = {
  type: React.PropTypes.string,
  appId: React.PropTypes.string,
  twitter: React.PropTypes.shape({
    hashtags: React.PropTypes.string,
    text: React.PropTypes.string,
    twitterHandle: React.PropTypes.string
  })
};

ShareButton.defaultProps = {
  type: 'link',
  appId: 'false'
};

export default ShareButton;
