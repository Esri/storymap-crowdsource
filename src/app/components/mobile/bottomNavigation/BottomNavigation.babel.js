// import $ from 'jquery';
import React from 'react';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Helper from 'babel/utils/helper/Helper';

export default class BottomNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const navigationClasses = Helper.classnames([this.props.className,this.props.classNames,'bottom-navigation']);

    return (
      <div className={navigationClasses}>
        {this.props.buttons.map((current) => {
          const buttonClasses = Helper.classnames([this.props.className,this.props.classNames,'text-btn',{
            active: current.active
          }]);
          const icon = getIcon(current.icon);
          const iconHtml = {
            __html: icon
          };

          return (<button
            key={current.name}
            className={buttonClasses}
            type="button"
            onClick={current.action}>
            <span className="icon" dangerouslySetInnerHTML={iconHtml}></span>
            <p className="name">{current.name}</p>
          </button>);
        })}
      </div>
    );
  }

}

BottomNavigation.propTypes = {
  buttons: React.PropTypes.array
};

BottomNavigation.defaultProps = {
  buttons: []
};
