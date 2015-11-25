import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';

export const BuilderBanner = class BuilderBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const bannerClass = Helper.classnames([this.props.className,
      ['builder-banner','navbar']
    ]);

    const backgroundImageStyle = {
      backgroundSize: 'auto'
    };

    return (
      <header className={bannerClass}>
        <LazyImage className="background-image" style={backgroundImageStyle} src={'resources/images/builder/builder-banner-background.png'} />
      </header>
    );

  }
};

BuilderBanner.propTypes = {
};

BuilderBanner.defaultProps = {
};

export default BuilderBanner;
