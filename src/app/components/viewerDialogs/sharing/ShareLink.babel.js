import $ from 'jquery';
import React from 'react';
import Clipboard from 'lib/clipboard/dist/clipboard';
import Helper from 'babel/utils/helper/Helper';
import Modal from 'babel/components/helper/modal/Modal';
import viewerText from 'i18n!translations/viewer/nls/template';
import 'bootstrap/tooltip';
import 'bootstrap/dropdown';
import 'bootstrap/transition';

export default class ShareLink extends React.Component {

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

    this.copySupported = document.queryCommandSupported('copy');
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
      const clipboard = new Clipboard('.share-link-dialog .copy-button');

      clipboard.on('success',this.onCopy);
    }
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
      setTimeout(()=>{
        this.selectAllFromNode(this.linkInput);
      },0);
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
    setTimeout(()=>{
      this.selectAllFromNode(this.embedCodeInput);
    },0);
  }

  changeShareLink(e) {
    this.setState({
      shareUrl: $(e.target).attr('data-clipboard-text')
    });
    setTimeout(()=>{
      this.selectAllFromNode(this.linkInput);
    },0);
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

  render() {

    const modalClasses = Helper.classnames([this.props.className,this.props.classNames,'share-link-dialog']);

    const options = {
      title: viewerText.sharing.link.title,
      body: (
        <form>
          <div className="form-group">
            <h6 className="text-primary">
              <strong>{viewerText.sharing.link.linkHeader}</strong>
              <br/>
              <small className="text-default">{viewerText.sharing.link.linkHelper}</small>
            </h6>
            <input type="text"  ref={(ref) => this.linkInput = ref} className="form-control" value={this.state.shareUrl} onClick={this.selectAllFromEvent} disabled></input>
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
            <textarea className="form-control" ref={(ref) => this.embedCodeInput = ref} value={this.state.embed.code} onClick={this.selectAllFromEvent} disabled></textarea>
          </div>
          <div className="embed-size-wrapper">
            {viewerText.sharing.link.embedSizeHelper}:
            <div className="dropdown">
              <button ref={(ref) => this.embedSizeDropdown = ref} type="button" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
                { this.state.embed.string }
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                {this.sizeOptions.map((current) => {
                  return <li key={current.id} onClick={this.changeEmbedSize.bind(this,current)}>{current.width} / {current.height}</li>;
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

ShareLink.propTypes = {
  closeAction: React.PropTypes.func
};

ShareLink.defaultProps = {
  closeAction: () => {}
};
