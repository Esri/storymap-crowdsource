import 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import 'bootstrap/collapse';
import 'bootstrap/transition';
import builderText from 'i18n!translations/builder/nls/template';

const bannerText = builderText.banner;

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

    return (
      <nav className={bannerClass}>
        <LazyImage className="background-image" style={backgroundImageStyle} src={'resources/images/builder/builder-banner-background.png'} />
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand">
              <span className="app-name">{bannerText.header.appName}</span> <span className="append">{bannerText.header.append}</span>
            </div>
          </div>
          <div id="builder-banner" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="#settings">{bannerText.buttons.settings}</a></li>
              <li><a href="#share">{bannerText.buttons.share}</a></li>
              <li><a href="#preview">{bannerText.buttons.preview}</a></li>
              <li><a href="#help">{bannerText.buttons.help}</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><p className="navbar-text">{bannerText.hintText.notSaved}</p></li>
              <li><button className="save btn btn-primary navbar-btn">{bannerText.buttons.save}</button></li>
            </ul>
          </div>
        </div>
      </nav>
    );

  }
};

BuilderBanner.propTypes = {
};

BuilderBanner.defaultProps = {
};

export default BuilderBanner;
