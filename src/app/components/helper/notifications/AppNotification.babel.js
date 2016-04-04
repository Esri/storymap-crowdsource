import React from 'react';
import Helper from 'babel/utils/helper/Helper';

export default class AppNotification extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const classes = Helper.classnames([this.props.className,'notification']);

    return (
      <div className={classes}>
        { this.props.children }
      </div>
    );
  }
}
