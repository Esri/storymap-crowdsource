import $ from 'jquery';
import React from 'react';
import Clipboard from 'clipboard';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Modal from 'babel/components/helper/modal/Modal';
import autosize from 'autosize';
import viewerText from 'i18n!translations/viewer/nls/template';
import builderText from 'i18n!translations/builder/nls/template';
import 'bootstrap/tooltip';
import 'bootstrap/dropdown';
import 'bootstrap/transition';

export default class AppSharing extends React.Component {

  constructor(props) {
    super(props);

    // Autobind methods
    this.selectAllFromEvent = this.selectAllFromEvent.bind(this);
    this.selectAllFromNode = this.selectAllFromNode.bind(this);
    this.changeShareLink = this.changeShareLink.bind(this);

    this.sizeOptions = [{
      id: 0,
      width: '100%',
      height: '800px'
    },{
      id: 1,
      width: '100%',
      height: '640px'
    },{
      id: 2,
      width: '800px',
      height: '600px'
    },{
      id: 3,
      width: '640px',
      height: '480px'
    }];

    this.copySupported = document.queryCommandSupported('copy') && window.navigator.userAgent.toLowerCase().indexOf('firefox') === -1 && window.navigator.userAgent.toLowerCase().indexOf('trident/') === -1 && window.navigator.userAgent.toLowerCase().indexOf('msie ') === -1;
    this.link = Helper.getSharingUrl();
    this.shortLink = this.getShortLink();

    this.state = {
      shareUrl: this.link,
      embed: this.getEmbed(0)
    };
  }

  componentDidMount() {
    const embedSizeDropdown = this.embedSizeDropdown;

    $(embedSizeDropdown).dropdown();

    this.selectAllFromNode(this.linkInput);

    if (this.copySupported) {
      const clipboard = new Clipboard('.app-share .copy-button');

      clipboard.on('success',this.onCopy);
    }

    autosize(this.embedCodeInput);
  }

  componentDidUpdate(prevProps,prevState) { //eslint-disable-line no-unused-vars
    if (prevState.shareUrl !== this.state.shareUrl) {
      this.selectAllFromNode(this.linkInput);
    } else if (prevState.embed.code !== this.state.embed.code) {
      this.selectAllFromNode(this.embedCodeInput);
    }

    autosize.update(this.embedCodeInput);
  }

  componentWillUnmount() {
    autosize.destroy(this.embedCodeInput);
  }

  getShortLink() {
    const self = this;
    const bitlyRequestUrl = 'https://api-ssl.bitly.com/v3/shorten?callback=?';

    $.getJSON(bitlyRequestUrl,{
      format: 'json',
			apiKey: this.props.sharing.appIds.bitly.key,
			login: this.props.sharing.appIds.bitly.login,
			longUrl: this.link
    },(res) => {
      if (res.data && res.data.url) {
        self.shortLink = res.data.url;
        self.setState({
          shareUrl: self.shortLink
        });
      }
    });

    return this.link;
  }

  getEmbed(id) {
    const embedOption = this.sizeOptions.filter((current) => {
      return current.id === id;
    })[0];

    return {
      code: '<iframe width="' + embedOption.width + '" height="' + embedOption.height + '" src="' + this.link + '" frameborder="0" scrolling="no"></iframe>',
      string: embedOption.width  + ' / ' + embedOption.height,
      width: embedOption.width,
      height: embedOption.height
    };
  }

  changeEmbedSize(options) {
    this.setState({
      embed: this.getEmbed(options.id,this.link)
    });
  }

  changeShareLink(e) {
    this.setState({
      shareUrl: $(e.target).attr('data-clipboard-text')
    });
  }

  selectAllFromEvent(e) {
    this.selectAllFromNode(e.target);
  }

  selectAllFromNode(node) {
    node.setSelectionRange(0, node.value.length);
  }

  onCopy(e) {
    const button = $(e.trigger);

    button.tooltip({
      title: viewerText.sharing.link.copied,
      trigger: 'manual'
    });
    button.tooltip('show');
    button.on('mouseout',() => {
      button.tooltip('destroy');
    });
  }

  updatePrivacyAction(access) {
    if (!this.props.appPrivacyUpdating) {
      this.props.updatePrivacyAction(access);
    }
  }

  render() {

    const modalClasses = Helper.classnames([this.props.className,this.props.classNames,'app-share']);

    const options = {
      closeButton: true,
      closeAction: this.props.closeAction,
      title: builderText.shareApp.title,
      body: (
        <form onSubmit={(e) => {
            e.preventDefault();
          }}>
          <div className="form-group text-center">
            <div className="app-privacy btn-group" role="group">
              <button
                type="button"
                className={Helper.classnames(['btn', {
                  'disabled': this.props.appPrivacyUpdating,
                  'btn-default': this.props.appPrivacy !== 'private',
                  'btn-primary': this.props.appPrivacy === 'private'
                }])}
                onClick={this.updatePrivacyAction.bind(this,'private')}>
                <span className="icon" dangerouslySetInnerHTML={{__html: getIcon('person')}}></span>
                <span className="text">{builderText.shareApp.sharePermissions.private}</span>
              </button>
              <button
                type="button"
                className={Helper.classnames(['btn', {
                  'disabled': this.props.appPrivacyUpdating,
                  'btn-default': this.props.appPrivacy !== 'org',
                  'btn-primary': this.props.appPrivacy === 'org'
                }])}
                onClick={this.updatePrivacyAction.bind(this,'org')}>
                <span className="icon" dangerouslySetInnerHTML={{__html: getIcon('people')}}></span>
                <span className="text">{builderText.shareApp.sharePermissions.organization}</span>
              </button>
              <button
                type="button"
                className={Helper.classnames(['btn', {
                  'disabled': this.props.appPrivacyUpdating,
                  'btn-default': this.props.appPrivacy !== 'public',
                  'btn-primary': this.props.appPrivacy === 'public'
                }])}
                onClick={this.updatePrivacyAction.bind(this,'public')}>
                <span className="icon" dangerouslySetInnerHTML={{__html: getIcon('map')}}></span>
                <span className="text">{builderText.shareApp.sharePermissions.public}</span>
              </button>
            </div>
          </div>
          <div className="form-group">
            <h6 className="text-primary">
              <strong>{viewerText.sharing.link.linkHeader}</strong>
              <br/>
              <small className="text-default">{viewerText.sharing.link.linkHelper}</small>
            </h6>
            <input type="text"  ref={(ref) => this.linkInput = ref} className="form-control" value={this.state.shareUrl} onClick={this.selectAllFromEvent} readOnly></input>
            <button
              type="button"
              className="btn btn-primary btn-sm link-button copy-button"
              data-clipboard-text={this.shortLink}
              onClick={this.changeShareLink}>
              {this.copySupported ? viewerText.sharing.link.copyShortLink : viewerText.sharing.link.showShortLink}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm link-button copy-button"
              data-clipboard-text={this.link}
              onClick={this.changeShareLink}>
              {this.copySupported ? viewerText.sharing.link.copyFullLink : viewerText.sharing.link.showFullLink}
            </button>
          </div>
          <div className="form-group">
            <h6 className="text-primary">
              <strong>{viewerText.sharing.link.embedCodeHeader}</strong>
              <br/>
              <small className="text-default">{viewerText.sharing.link.embedCodeHelper}</small>
            </h6>
            <textarea className="form-control" ref={(ref) => this.embedCodeInput = ref} value={this.state.embed.code} onClick={this.selectAllFromEvent} readOnly></textarea>
          </div>
          <div className="embed-size-wrapper">
            {viewerText.sharing.link.embedSizeHelper}:
            <div className="dropup">
              <button ref={(ref) => this.embedSizeDropdown = ref} type="button" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
                { this.state.embed.string }
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                {this.sizeOptions.map((current) => {
                  return <li key={current.id} onClick={this.changeEmbedSize.bind(this,current)}><a href="#"><small>{current.width} / {current.height}</small></a></li>;
                })}
              </ul>
            </div>
            {this.copySupported ? (
              <button
                type="button"
                className="btn btn-primary btn-sm copy-button"
                data-clipboard-text={this.state.embed.code}>
                {viewerText.sharing.link.copyEmbedCode}
              </button>
            ) : null }
          </div>
        </form>
      ),
      footer: <button className="btn btn-default btn-sm" onClick={this.props.closeAction}>{viewerText.common.buttons.close}</button>
    };

    return <Modal className={modalClasses} {...options} />;
  }

}

AppSharing.propTypes = {
  appPrivacyUpdating: React.PropTypes.bool,
  appPrivacy: React.PropTypes.string,
  updataPrivacyAction: React.PropTypes.func,
  closeAction: React.PropTypes.func
};

AppSharing.defaultProps = {
  appPrivacyUpdating: false,
  appPrivacy: 'private',
  updataPrivacyAction: () => {},
  closeAction: () => {}
};
