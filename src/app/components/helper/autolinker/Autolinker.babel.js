import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import AutolinkerJS from 'Autolinker';

export const Autolinker = class Autolinker extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const mainClasses = Helper.classnames([this.props.className, 'autolinker']);
    const linkedString = AutolinkerJS.link(this.props.text,{
      phone: false,
      hashtag: 'twitter'
    });

    return (
      <p className={mainClasses} dangerouslySetInnerHTML={{__html: linkedString}}></p>
    );
  }

};

Autolinker.propTypes = {
  text: React.PropTypes.string
};

Autolinker.defaultProps = {
  text: ''
};

export default Autolinker;
