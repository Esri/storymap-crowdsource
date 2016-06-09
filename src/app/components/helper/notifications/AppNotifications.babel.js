import React from 'react';
import Helper from 'babel/utils/helper/Helper';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class AppNotifications extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const classes = Helper.classnames([this.props.className,'app-notifications']);

    return (
      <ReactCSSTransitionGroup
        className={classes}
        component="div"
        transitionName="notify"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500} >
        {[].concat(this.props.notifications).reverse().map((current) => {

          const notificationClasses = Helper.classnames([this.props.className,'notification','alert'],{
            'alert-danger': current.type === 'error',
            'alert-info': current.type === 'info' || current.type !== 'error'
          });

          return (
            <div key={current.id} className={notificationClasses}>
              {current.content}
            </div>
          );
        })}
      </ReactCSSTransitionGroup>
    );
  }
}

AppNotifications.propTypes = {
  notifications: React.PropTypes.array
};

AppNotifications.defaultProps = {
  notifications: []
};
