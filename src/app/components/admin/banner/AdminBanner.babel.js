import 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import 'bootstrap/collapse';
import 'bootstrap/transition';
import viewerText from 'i18n!translations/viewer/nls/template';

const commonText = viewerText.common;

export const AdminBanner = class AdminBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const bannerClass = Helper.classnames([this.props.className,
      ['control-banner','admin-banner','navbar','navbar-inverse']
    ]);

    const backgroundImageStyle = {
      backgroundSize: 'cover',
      backgroundRepeat: 'norepeat'
    };

    const mobileMenuButton = this.props.brandOnly ? null : (
      <button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
        {/*<span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>*/}
      </button>
    );

    const bannerButtons = this.props.brandOnly ? null : (
      <div id="builder-banner" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><a href="#" onClick={this.props.editAction}>{viewerText.banner.buttons.edit}</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><button
            type="button"
            className="btn btn-secondary navbar-btn hide-button"
            onClick={this.props.hideAction}
            >{viewerText.banner.buttons.hide}</button></li>
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
              <span className="prepend">{commonText.appNamePrepend}</span> <span className="app-name">{commonText.appName}</span>
            </div>
          </div>
          { bannerButtons }
        </div>
      </nav>
    );

  }
};

AdminBanner.propTypes = {
  hideAction: React.PropTypes.func,
  editAction: React.PropTypes.func
};

AdminBanner.defaultProps = {
  hideAction: () => {},
  editAction: () => {}
};

export default AdminBanner;
