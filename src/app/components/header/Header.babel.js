import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import ShareButtonPane from 'babel/components/sharing/ShareButtonPane';

export const Header = class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    Helper.layout.resetRegionLayout(true);
  }

  render() {

    const headerClass = Helper.classnames([this.props.className, {
      header: true
    }]);
    const participateIconHtml = {
      __html: getIcon('participate')
    };

    return (
      <header className={headerClass}>
        <div className="primary-content region-center">
          <a href={this.props.logo.link} className="logo-link region-left" target="_blank">
            <img src={this.props.logo.source} className="logo" alt={this.props.logo.link} />
          </a>
          <h4 className="title region-center">{this.props.title}</h4>
        </div>
        <div className="secondary-content region-right">
          <button className="participate text-btn">
            <span dangerouslySetInnerHTML={participateIconHtml}></span>
            {this.props.participateText}
          </button>
          <ShareButtonPane social={this.props.social} />
        </div>
      </header>
    );

  }
};

Header.propTypes = {
  logo: React.PropTypes.shape({
    link: React.PropTypes.string,
    source: React.PropTypes.string
  }),
  title: React.PropTypes.string,
  participateText: React.PropTypes.string,
  social: React.PropTypes.shape({
    facebook: React.PropTypes.bool,
    twitter: React.PropTypes.bool,
    bitly: React.PropTypes.bool
  })
};

Header.defaultProps = {
  logo: {
    link: '',
    source: ''
  },
  title: '',
  participateText: '',
  social: {
    facebook: false,
    twitter: false,
    bitly: false
  }
};

export default Header;
