import 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import 'bootstrap/collapse';
import 'bootstrap/transition';
import builderText from 'i18n!translations/builder/nls/template';

const bannerText = builderText.banner;
const commonText = builderText.common;

export const BuilderBanner = class BuilderBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const bannerClass = Helper.classnames([this.props.className,
      ['builder-banner','navbar','navbar-inverse']
    ]);

    const backgroundImageStyle = {
      backgroundSize: 'auto',
      backgroundRepeat: 'repeat-x'
    };

    const mobileMenuButton = this.props.brandOnly ? null : (
      <button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    );

    const bannerButtons = this.props.brandOnly ? null : (
      <div id="builder-banner" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><a href="#settings">{bannerText.buttons.settings}</a></li>
          <li><a href="#share">{bannerText.buttons.share}</a></li>
          <li><a href="#preview">{bannerText.buttons.preview}</a></li>
          <li><a href="#help">{bannerText.buttons.help}</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><p className="navbar-text">{bannerText.hintText.saved}</p></li>
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
              <span className="app-name">{commonText.appName}</span> <span className="append">{commonText.appNameAppend}</span>
            </div>
          </div>
          { bannerButtons }
        </div>
      </nav>
    );

  }
};

BuilderBanner.propTypes = {
  brandOnly: React.PropTypes.bool
};

BuilderBanner.defaultProps = {
  brandOnly: false
};

export default BuilderBanner;
