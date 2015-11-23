import React from 'react';
import Helper from 'babel/utils/helper/Helper';

export const BuilderBanner = class BuilderBanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const bannerClass = Helper.classnames([this.props.className,
      ['nav','navbar']
    ]);

    return (
      <header className={bannerClass}>

      </header>
    );

  }
};

BuilderBanner.propTypes = {
};

BuilderBanner.defaultProps = {
};

export default BuilderBanner;
