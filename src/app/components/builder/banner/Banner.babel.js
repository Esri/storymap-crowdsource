import 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import 'bootstrap/collapse';
import 'bootstrap/transition';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

const bannerText = builderText.banner;
const commonBuilderText = builderText.common;
const commonViewerText = viewerText.common;

export const BuilderBanner = class BuilderBanner extends React.Component {

  constructor(props) {
    super(props);

    this.previewLink = Helper.getSharingUrl();
  }

  render() {

    const bannerClass = Helper.classnames([this.props.className,
      ['control-banner','builder-banner','navbar','navbar-inverse']
    ]);

    const backgroundImageStyle = {
      backgroundSize: 'cover',
      backgroundRepeat: 'norepeat'
    };

    const mobileMenuButton = this.props.brandOnly ? null : (
      <button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">{bannerText.buttons.toggleNav}</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    );

    const bannerButtons = this.props.brandOnly ? null : (
      <div id="builder-banner" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><a href="#" onClick={this.props.settingsAction}>{bannerText.buttons.settings}</a></li>
          <li><a href="#" onClick={this.props.shareAction}>{bannerText.buttons.share}</a></li>
          { this.previewLink !== 'http://www.example.com' ? <li><a href={this.previewLink} target="_blank">{bannerText.buttons.preview}</a></li> : null }
          <li><a href="#" onClick={this.props.helpAction}>{bannerText.buttons.help}</a></li>
          <li><a href="https://links.esri.com/storymaps/forum" target="_blank">{bannerText.buttons.feedback}</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          { this.props.displayReviewDropdown ? (
            <li className="dropdown">
              <button
                type="button"
                className="btn btn-info navbar-btn dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">{builderText.review.selection.header}: {builderText.review.selection.options[this.props.reviewSelection]} <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li className={Helper.classnames({'bg-info': this.props.reviewSelection === 'all'})}><a href="#" onClick={this.props.changeReviewSelection.bind(this,'all')}>{builderText.review.selection.options.all}</a></li>
                <li className={Helper.classnames({'bg-info': this.props.reviewSelection === 'new'})}><a href="#" onClick={this.props.changeReviewSelection.bind(this,'new')}>{builderText.review.selection.options.new}</a></li>
                <li className={Helper.classnames({'bg-info': this.props.reviewSelection === 'approved'})}><a href="#" onClick={this.props.changeReviewSelection.bind(this,'approved')}>{builderText.review.selection.options.approved}</a></li>
                <li className={Helper.classnames({'bg-info': this.props.reviewSelection === 'rejected'})}><a href="#" onClick={this.props.changeReviewSelection.bind(this,'rejected')}>{builderText.review.selection.options.rejected}</a></li>
              </ul>
            </li>
          ) : null }
          <li><p className="navbar-text">{this.props.saving ? bannerText.hintText.saving : bannerText.hintText.saved}</p></li>
        </ul>
      </div>
    );

    return (
      <nav className={bannerClass}>
        <LazyImage className="background-image" style={backgroundImageStyle} src={'resources/images/builder/builder-banner-background.png'} />
        <div className="container-fluid">
          <div className="navbar-header">
            { mobileMenuButton }
            <div className="navbar-brand">
              <span className="prepend">{commonViewerText.appNamePrepend}</span> <span className="app-name">{commonViewerText.appName}</span> <span className="append">{commonBuilderText.appNameAppend}</span>
            </div>
          </div>
          { bannerButtons }
        </div>
      </nav>
    );

  }
};

BuilderBanner.propTypes = {
  brandOnly: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  displayReviewDropdown: React.PropTypes.bool,
  reviewSelection: React.PropTypes.string,
  changeReviewSelection: React.PropTypes.func,
  settingsAction: React.PropTypes.func,
  shareAction: React.PropTypes.func,
  helpAction: React.PropTypes.func
};

BuilderBanner.defaultProps = {
  brandOnly: false,
  saving: false,
  displayReviewDropdown: false,
  reviewSelection: 'all',
  changeReviewSelection: () => {},
  settingsAction: () => {},
  shareAction: () => {},
  helpAction: () => {}
};

export default BuilderBanner;
